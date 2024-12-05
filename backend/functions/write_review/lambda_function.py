import boto3
import json
import time

# Initialize DynamoDB client
dynamodb = boto3.resource('dynamodb', region_name='ca-central-1')
table = dynamodb.Table('RoommateRatings')

def lambda_handler(event, context):
    try:
        # Parse incoming request
        body = json.loads(event['body'])
        reviewer_id = body.get('reviewerId')
        recipient_id = body.get('recipientId')
        score = body.get('score')
        review_text = body.get('reviewText', '')  # Optional field
        
        # Validate input
        if not (reviewer_id and recipient_id and score):
            return {
                'statusCode': 400,
                'body': json.dumps({'message': 'ReviewerId, RecipientId, and Score are required!'})
            }

        # Generate timestamp and SortKey
        timestamp = int(time.time())
        data_type_timestamp = f"Review#{timestamp}"

        # Create a new review item
        table.put_item(
            Item={
                'UserId': recipient_id,  # Partition key is the recipient's UserId
                'DataType#Timestamp': data_type_timestamp,    # Sort key starts with "Review#"
                'ReviewerId': reviewer_id,
                'RecipientId': recipient_id,
                'Score': score,
                'ReviewText': review_text,
                'Timestamp': timestamp
            }
        )

        return {
            'statusCode': 200,
            'body': json.dumps({'message': 'Review successfully added!'})
        }

    except Exception as e:
        print(f"Error: {e}")
        return {
            'statusCode': 500,
            'body': json.dumps({'message': 'An error occurred while adding the review.', 'error': str(e)})
        }