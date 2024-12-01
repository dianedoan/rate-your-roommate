import boto3
import json

dynamodb = boto3.resource('dynamodb', region_name='ca-central-1')
table = dynamodb.Table('RoommateRatings')

def lambda_handler(event, context):
    try:
        body = json.loads(event['body'])
        user_id = body.get('UserId')
        profile_data = body.get('ProfileData')

        if not user_id or not profile_data:
            return {
                'statusCode': 400,
                'body': json.dumps({'message': 'UserId and ProfileData are required.'})
            }

        table.update_item(
            Key={'UserId': user_id},
            UpdateExpression="SET ProfileData = :profile",
            ExpressionAttributeValues={
                ':profile': profile_data
            }
        )

        return {
            'statusCode': 200,
            'body': json.dumps({'message': 'Profile updated successfully!'})
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'message': 'An error occurred.', 'error': str(e)})
        }
