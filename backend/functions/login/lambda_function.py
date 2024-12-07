import boto3
import json
import bcrypt
from botocore.exceptions import ClientError

# Initialize DynamoDB client
dynamodb = boto3.resource('dynamodb', region_name='ca-central-1')
table = dynamodb.Table('RoommateRatings')

def lambda_handler(event, context):
    try:
        # Parse the incoming request
        body = json.loads(event['body'])
        username = body.get('username')
        password = body.get('password')

        # Validate input
        if not username or not password:
            return {
                'statusCode': 400,
                'body': json.dumps({'message': 'Username and password are required.'})
            }

        # Query the table by scanning for the username
        response = table.scan(
            FilterExpression=boto3.dynamodb.conditions.Attr("username").eq(username) &
                             boto3.dynamodb.conditions.Attr("DataType#Timestamp").begins_with("SignUp")
        )

        user_items = response.get("Items", [])
        if not user_items:
            # Generic error to avoid revealing whether username exists
            return {
                'statusCode': 401,
                'body': json.dumps({'message': 'Invalid username or password.'})
            }

        user = user_items[0]  # Assuming one sign-up record per user

        # Verify the password
        hashed_password = user.get('password')
        if not bcrypt.checkpw(password.encode('utf-8'), hashed_password.encode('utf-8')):
            return {
                'statusCode': 401,
                'body': json.dumps({'message': 'Invalid username or password.'})
            }

        # Return the UserId and SortKey
        return {
            'statusCode': 200,
            'body': json.dumps({
                'message': 'Login successful!',
                'UserId': user.get('UserId'),
                'SortKey': user.get('DataType#Timestamp'),
                'city' : user.get('city')
            })
        }

    except ClientError as e:
        print(e)
        return {
            'statusCode': 500,
            'body': json.dumps({'message': 'An error occurred.', 'error': str(e)})
        }
    except Exception as e:
        print(e)
        return {
            'statusCode': 500,
            'body': json.dumps({'message': 'An unexpected error occurred.', 'error': str(e)})
        }
