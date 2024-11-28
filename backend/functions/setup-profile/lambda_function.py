import boto3
import json
from botocore.exceptions import ClientError

# Initialize DynamoDB client
dynamodb = boto3.resource('dynamodb', region_name='ca-central-1')
table = dynamodb.Table('RoommateRatings')

def lambda_handler(event, context):
    try:
        # Parse incoming request
        body = json.loads(event['body'])
        user_id = body.get('UserId')  # Ensure frontend sends UserId
        data_type = body.get('DataType#Timestamp')
        about_me = body.get('aboutMe')
        occupation = body.get('occupation')
        country = body.get('country')
        state = body.get('state')
        city = body.get('city')
        preferences = body.get('preferences')

        # Validate input
        if not user_id:
            return {
                'statusCode': 400,
                'body': json.dumps({'message': 'UserId is required.'})
            }

        # Update the user's profile in DynamoDB
        table.update_item(
            Key={
                'UserId': user_id,
                'DataType#Timestamp': data_type
            },
            UpdateExpression="SET ProfileData = :profile",
            ExpressionAttributeValues={
                ':profile': {
                    'aboutMe': about_me,
                    'occupation': occupation,
                    'country': country,
                    'state': state,
                    'city': city,
                    'preferences': preferences or []
                }
            }
        )

        return {
            'statusCode': 200,
            'body': json.dumps({'message': 'Profile successfully updated!'})
        }

    except ClientError as e:
        print(e)
        return {
            'statusCode': 500,
            'body': json.dumps({'message': 'Failed to update profile', 'error': str(e)})
        }
    except Exception as e:
        print(e)
        return {
            'statusCode': 500,
            'body': json.dumps({'message': 'An unexpected error occurred', 'error': str(e)})
        }
