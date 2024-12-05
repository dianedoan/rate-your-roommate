import boto3
import json

# Initialize DynamoDB client
dynamodb = boto3.resource('dynamodb', region_name='ca-central-1')
table = dynamodb.Table('RoommateRatings')

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
            KeyConditionExpression="RecipientId = :recipientId AND begins_with(DataType#Timestamp, :prefix)",
            ExpressionAttributeValues={
                ":recipientId": recipient_id,
                ":prefix": "Review#"
            },
            ProjectionExpression="Score, ReviewText, Timestamp"
        )

        reviews = response.get('Items', [])
        if not reviews:
            return {
                'statusCode': 200,
                'body': json.dumps({'message': 'No reviews found for the specified user.', 'reviews': []})
            }

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
