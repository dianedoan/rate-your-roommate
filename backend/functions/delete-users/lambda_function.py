import boto3
import json

# Initialize the DynamoDB client
dynamodb = boto3.resource('dynamodb', region_name='ca-central-1')
table = dynamodb.Table('RoommateRatings')  

def lambda_handler(event, context):
    try:
        # Parse request body
        body = json.loads(event['body'])
        user_id = body.get('UserId')
        sort_key = body.get('SortKey')

        # Validate input
        if not user_id or not sort_key:
            return {
                'statusCode': 400,
                'body': json.dumps({'message': 'UserId and SortKey are required!'})
            }

        # Delete the item
        response = table.delete_item(
            Key={
                'UserId': user_id,
                'DataType#Timestamp': sort_key
            }
        )

        # Check the response
        if response.get('ResponseMetadata', {}).get('HTTPStatusCode') == 200:
            return {
                'statusCode': 200,
                'body': json.dumps({'message': f'User {user_id} with sort key {sort_key} deleted successfully.'})
            }
        else:
            return {
                'statusCode': 500,
                'body': json.dumps({'message': 'Failed to delete the user.'})
            }

    except Exception as e:
        print(f"Error: {e}")
        return {
            'statusCode': 500,
            'body': json.dumps({'message': 'An error occurred while deleting the user.', 'error': str(e)})
        }
