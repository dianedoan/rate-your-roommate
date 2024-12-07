import boto3
import json

# Initialize DynamoDB client
dynamodb = boto3.resource('dynamodb', region_name='ca-central-1')
table = dynamodb.Table('RoommateRatings')

def lambda_handler(event, context):
    try:
        # Get the UserId from the query parameters
        user_id = event['queryStringParameters']['UserId']

        # Validate input
        if not user_id:
            return {
                'statusCode': 400,
                'body': json.dumps({'message': 'UserId is required!'})
            }

        # Query items with the given UserId
        response = table.query(
            KeyConditionExpression="UserId = :userId",
            ExpressionAttributeValues={":userId": user_id},
            ProjectionExpression="#dataType",
            ExpressionAttributeNames={"#dataType": "DataType#Timestamp"}
        )

        # Filter items locally to find the SortKey that starts with 'SignUp#'
        items = response.get('Items', [])
        signup_item = next(
            (item for item in items if item['DataType#Timestamp'].startswith('SignUp#')), None
        )

        if not signup_item:
            return {
                'statusCode': 404,
                'body': json.dumps({'message': 'SignUp item not found for the given UserId.'})
            }

        return {
            'statusCode': 200,
            'body': json.dumps({'message': 'SortKey retrieved successfully.', 'SortKey': signup_item['DataType#Timestamp']})
        }

    except Exception as e:
        print(f"Error: {e}")
        return {
            'statusCode': 500,
            'body': json.dumps({'message': 'An error occurred while retrieving the SortKey.', 'error': str(e)})
        }
