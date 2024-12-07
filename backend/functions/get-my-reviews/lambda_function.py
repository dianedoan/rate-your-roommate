
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
        # Get the ReviewerId from the query parameters
        reviewer_id = event['queryStringParameters']['ReviewerId']

        # Validate input
        if not reviewer_id:
            return {
                'statusCode': 400,
                'body': json.dumps({'message': 'ReviewerId is required!'})
            }

        # Query the ReviewerId-index for reviews
        review_response = table.query(
            IndexName="ReviewerId-index",
            KeyConditionExpression="ReviewerId = :ReviewerId AND begins_with(#dataTypeTimestamp, :prefix)",
            ExpressionAttributeValues={
                ":ReviewerId": reviewer_id,
                ":prefix": "Review#"
            },
            ExpressionAttributeNames={"#dataTypeTimestamp": "DataType#Timestamp", "#Timestamp": "Timestamp"},
            ProjectionExpression="Score, ReviewText, YesNoAnswers, #Timestamp, #dataTypeTimestamp"
        )

        reviews = review_response.get('Items', [])
        reviews = decimal_to_float(reviews)  # Convert Decimals to floats

        return {
            'statusCode': 200,
            'body': json.dumps({
                'message': 'Reviews retrieved successfully.',
                'reviews': reviews
            })
        }

    except Exception as e:
        print(f"Error: {e}")
        return {
            'statusCode': 500,
            'body': json.dumps({'message': 'An error occurred while retrieving reviews.', 'error': str(e)})
        }
