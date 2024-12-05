import boto3
import json
from collections import defaultdict

# Initialize DynamoDB client
dynamodb = boto3.resource('dynamodb', region_name='ca-central-1')
table = dynamodb.Table('RoommateRatings')

def lambda_handler(event, context):
    try:
        # Scan for reviews (optimized with ProjectionExpression)
        response = table.scan(
            FilterExpression="begins_with(SortKey, :reviewPrefix)",
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

        # Batch get profiles for the top-rated users
        keys = [{'UserId': rid, 'SortKey': 'SignUp#'} for rid in top_recipient_ids]
        profile_response = dynamodb.batch_get_item(
            RequestItems={
                'RoommateRatings': {
                    'Keys': keys
                }
            }
        )

        profiles = profile_response['Responses'].get('RoommateRatings', [])
        top_rated_users = [
            {
                'RecipientId': profile['UserId'],
                'FirstName': profile.get('FirstName', 'Unknown'),
                'LastName': profile.get('LastName', 'Unknown'),
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
