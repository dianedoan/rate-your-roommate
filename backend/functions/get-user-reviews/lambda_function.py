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

        # Query the RecipientIndex
        response = table.query(
            IndexName="RecipientIndex",
            KeyConditionExpression="RecipientId = :recipientId AND begins_with(#dataTypeTimestamp, :prefix)",
            ExpressionAttributeValues={
                ":recipientId": recipient_id,
                ":prefix": "Review#"
            },
            ExpressionAttributeNames={"#dataTypeTimestamp": "DataType#Timestamp"},
            ProjectionExpression="Score, ReviewText, YesNoAnswers, #dataTypeTimestamp"
        )

        reviews = response.get('Items', [])
        if not reviews:
            return {
                'statusCode': 200,
                'body': json.dumps({'message': 'No reviews found for the specified user.', 'reviews': []})
            }

        # Convert Decimal to float
        reviews = decimal_to_float(reviews)

        return {
            'statusCode': 200,
            'body': json.dumps({'message': 'Reviews retrieved successfully.', 'reviews': reviews})
        }

    except Exception as e:
        print(f"Error: {e}")
        return {
            'statusCode': 500,
            'body': json.dumps({'message': 'An error occurred while retrieving reviews.', 'error': str(e)})
        }
