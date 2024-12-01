import boto3
import json

dynamodb = boto3.resource('dynamodb', region_name='ca-central-1')
table = dynamodb.Table('RoommateRatings')

def lambda_handler(event, context):
    try:
        user_id = event.get('queryStringParameters', {}).get('UserId')
        
        if not user_id:
            return {
                'statusCode': 400,
                'body': json.dumps({'message': 'UserId is required.'})
            }

        response = table.get_item(Key={'UserId': user_id})
        user = response.get('Item')
        
        if not user:
            return {
                'statusCode': 404,
                'body': json.dumps({'message': 'User not found.'})
            }

        return {
            'statusCode': 200,
            'body': json.dumps(user)
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'message': 'An error occurred.', 'error': str(e)})
        }
