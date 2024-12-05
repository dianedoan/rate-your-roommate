import boto3
import json

# Initialize DynamoDB client
dynamodb = boto3.resource('dynamodb', region_name='ca-central-1')
table = dynamodb.Table('RoommateRatings')

def lambda_handler(event, context):
    try:
        # Get UserId from query parameters
        query_params = event.get('queryStringParameters', {})
        user_id = query_params.get('UserId')

        # Validate UserId
        if not user_id:
            return {
                'statusCode': 400,
                'body': json.dumps({'message': 'UserId is required!'})
            }

        # Query DynamoDB for SortKey that starts with "SignUp#"
        response = table.query(
            KeyConditionExpression="UserId = :userId AND begins_with(SortKey, :prefix)",
            ExpressionAttributeValues={
                ":userId": user_id,
                ":prefix": "SignUp#"
            },
            ProjectionExpression="SortKey"
        )

        # Extract the items
        items = response.get('Items', [])
        if not items:
            return {
                'statusCode': 404,
                'body': json.dumps({'message': 'No matching SortKey found for the specified UserId.'})
            }

        # Return the first matching SortKey
        return {
            'statusCode': 200,
            'body': json.dumps({
                'message': 'SortKey retrieved successfully.',
                'SortKey': items[0]['SortKey']  # Assuming only need the first match
            })
        }

    except Exception as e:
        print(f"Error: {e}")
        return {
            'statusCode': 500,
            'body': json.dumps({'message': 'An error occurred while retrieving the SortKey.', 'error': str(e)})
        }
