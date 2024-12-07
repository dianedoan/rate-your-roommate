import boto3
import json
from decimal import Decimal

# Initialize DynamoDB client
dynamodb = boto3.resource('dynamodb', region_name='ca-central-1')
table = dynamodb.Table('RoommateRatings')

# Helper function to convert Decimal to float
def decimal_to_float(obj):
    if isinstance(obj, list):
        return [decimal_to_float(item) for item in obj]
    elif isinstance(obj, dict):
        return {key: decimal_to_float(value) for key, value in obj.items()}
    elif isinstance(obj, Decimal):
        return float(obj)
    else:
        return obj

def lambda_handler(event, context):
    try:
        # Get the RecipientId from the query parameters
        recipient_id = event['queryStringParameters']['RecipientId']

        # Validate input
        if not recipient_id:
            return {
                'statusCode': 400,
                'body': json.dumps({'message': 'RecipientId is required!'})
            }

        # Query the RecipientIndex for reviews
        review_response = table.query(
            IndexName="RecipientIndex",
            KeyConditionExpression="RecipientId = :recipientId AND begins_with(#dataTypeTimestamp, :prefix)",
            ExpressionAttributeValues={
                ":recipientId": recipient_id,
                ":prefix": "Review#"
            },
            ExpressionAttributeNames={"#dataTypeTimestamp": "DataType#Timestamp", "#Timestamp": "Timestamp"},
            ProjectionExpression="Score, ReviewText, YesNoAnswers, #Timestamp, #dataTypeTimestamp"
        )

        reviews = review_response.get('Items', [])
        reviews = decimal_to_float(reviews)  # Convert Decimals to floats

        # Get user profile information
        profile_response = table.query(
            KeyConditionExpression="UserId = :recipientId AND begins_with(#dataTypeTimestamp, :prefix)",
            ExpressionAttributeValues={
                ":recipientId": recipient_id,
                ":prefix": "SignUp#"
            },
            ExpressionAttributeNames={"#dataTypeTimestamp": "DataType#Timestamp", "#state": "state"},
            ProjectionExpression="first_name, last_name, occupation, city, profile_picture, ProfileData, #state"
        )

        profile_items = profile_response.get('Items', [])
        if not profile_items:
            return {
                'statusCode': 404,
                'body': json.dumps({'message': 'User profile not found for the specified RecipientId.'})
            }

        profile = profile_items[0]
        profile_data = {
            "FirstName": profile.get("first_name"),
            "LastName": profile.get("last_name"),
            "Occupation": profile.get("occupation"),
            "City": profile.get("city"),
            "State": profile.get("state"),
            "ProfilePicture": profile.get("profile_picture"),
            "AboutMe": profile.get("ProfileData", {}).get("aboutMe"),
            "Preferences": profile.get("ProfileData", {}).get("preferences")
        }

        return {
            'statusCode': 200,
            'body': json.dumps({
                'message': 'Reviews retrieved successfully.',
                'user': profile_data,
                'reviews': reviews
            })
        }

    except Exception as e:
        print(f"Error: {e}")
        return {
            'statusCode': 500,
            'body': json.dumps({'message': 'An error occurred while retrieving reviews.', 'error': str(e)})
        }

