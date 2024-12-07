import boto3
import json
import bcrypt

# Initialize the DynamoDB client
dynamodb = boto3.resource('dynamodb', region_name='ca-central-1')
table = dynamodb.Table('RoommateRatings')

def lambda_handler(event, context):
    try:
        # Parse the request body
        body = json.loads(event['body'])
        user_id = body.get('userId')
        sort_key = body.get('sortKey')
        new_password = body.get('newPassword')

        # Validate input
        if not (user_id and sort_key and new_password):
            return {
                'statusCode': 400,
                'body': json.dumps({'message': 'UserId, SortKey, and NewPassword are required!'})
            }

        # Hash the new password
        hashed_password = bcrypt.hashpw(new_password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

        # Update the password in DynamoDB
        table.update_item(
            Key={
                'UserId': user_id,
                'DataType#Timestamp': sort_key
            },
            UpdateExpression="SET #password = :password",
            ExpressionAttributeValues={':password': hashed_password},
            ExpressionAttributeNames={
                '#password': 'password'  # Attribute name in DynamoDB
            }
        )

        return {
            'statusCode': 200,
            'body': json.dumps({'message': 'Password reset successful!'})
        }

    except Exception as e:
        print(f"Error: {e}")
        return {
            'statusCode': 500,
            'body': json.dumps({'message': 'An error occurred while resetting the password.', 'error': str(e)})
        }
