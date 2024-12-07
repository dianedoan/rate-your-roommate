import boto3
import json
from collections import defaultdict
from boto3.dynamodb.conditions import Key

# Initialize DynamoDB client
dynamodb = boto3.resource('dynamodb', region_name='ca-central-1')
table = dynamodb.Table('RoommateRatings')

def lambda_handler(event, context):
    try:
        # Scan for reviews (use ExpressionAttributeNames for special characters)
        response = table.scan(
            FilterExpression="begins_with(#dataTypeTimestamp, :reviewPrefix)",
            ExpressionAttributeNames={"#dataTypeTimestamp": "DataType#Timestamp"},
            ExpressionAttributeValues={":reviewPrefix": "Review#"},
            ProjectionExpression="RecipientId, Score"
        )

        reviews = response.get('Items', [])
        if not reviews:
            return {
                'statusCode': 200,
                'body': json.dumps({'message': 'No reviews found.', 'topRatedUsers': []})
            }

        # Aggregate scores by RecipientId
        scores = defaultdict(list)
        for review in reviews:
            recipient_id = review['RecipientId']
            scores[recipient_id].append(float(review['Score']))

        # Calculate average scores
        average_scores = [
            {'RecipientId': recipient_id, 'AverageScore': sum(scores[recipient_id]) / len(scores[recipient_id])}
            for recipient_id in scores
        ]

        # Sort by average score
        average_scores.sort(key=lambda x: x['AverageScore'], reverse=True)

        # Limit to top 3 users
        top_recipient_ids = [user['RecipientId'] for user in average_scores[:3]]

        # Query for profiles of the top-rated users
        profiles = []
        for rid in top_recipient_ids:
            profile_response = table.query(
                KeyConditionExpression=Key('UserId').eq(rid) & Key('DataType#Timestamp').begins_with("SignUp#"),
                ExpressionAttributeNames={"#state": "state"},
                ProjectionExpression="UserId, first_name, last_name, occupation, city, profile_picture, ProfileData, #state"
            )
            profiles.extend(profile_response.get('Items', []))

        # Combine profiles with scores
        top_rated_users = [
            {
                'RecipientId': profile['UserId'],
                'FirstName': profile.get('first_name', 'Unknown'),
                'LastName': profile.get('last_name', 'Unknown'),
                'Occupation': profile.get('occupation', 'Unknown'),
                'ProfilePicture': profile.get('profile_picture', 'Unknown'),
                'City': profile.get('city', 'Unknown'),
                'State': profile.get('state', 'Unknown'),
                'AboutMe': profile.get('ProfileData', {}).get('aboutMe'),
                'AverageScore': next((x['AverageScore'] for x in average_scores if x['RecipientId'] == profile['UserId']), 0)
            }
            for profile in profiles
        ]

        return {
            'statusCode': 200,
            'body': json.dumps({'message': 'Top-rated users retrieved successfully.', 'topRatedUsers': top_rated_users})
        }

    except Exception as e:
        print(f"Error: {e}")
        return {
            'statusCode': 500,
            'body': json.dumps({'message': 'An error occurred while retrieving top-rated users.', 'error': str(e)})
        }
