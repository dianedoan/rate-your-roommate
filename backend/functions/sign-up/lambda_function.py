import boto3
import json
import bcrypt
import uuid
import time
from botocore.exceptions import ClientError

# Initialize DynamoDB client
dynamodb = boto3.resource('dynamodb', region_name='ca-central-1')
table = dynamodb.Table('RoommateRatings')

# Define the default profile picture URL
default_profile_picture = "https://res.cloudinary.com/djx2y175z/image/upload/v1733203679/profile0_mcl0ts.png"

def lambda_handler(event, context):
    try:
        # Parse incoming request
        body = json.loads(event['body'])
        username = body.get('username')
        email = body.get('email')
        first_name = body.get('first_name')
        last_name = body.get('last_name')
        password = body.get('password')
        security_question = body.get('security_question')
        security_answer = body.get('security_answer')

        # Validate input
        if not (username and email and first_name and last_name and password and security_question and security_answer):
            return {
                'statusCode': 400,
                'body': json.dumps({'message': 'All fields are required!'})
            }

        # Check if username or email already exists
        existing_user = table.scan(
            FilterExpression="username = :username OR email = :email",
            ExpressionAttributeValues={
                ":username": username,
                ":email": email
            }
        )

        if existing_user['Count'] > 0:
            return {
                'statusCode': 400,
                'body': json.dumps({'message': 'Username or email already exists!'})
            }

        # Generate a unique UserId
        user_id = str(uuid.uuid4())

        # Hash the password
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

        # Define the DataType and generate the current UNIX timestamp
        data_type = "SignUp"
        timestamp = int(time.time())  # Generate a UNIX timestamp
        sort_key = f"{data_type}#{timestamp}"  # Combine DataType and Timestamp

        # Store user data in DynamoDB
        table.put_item(
            Item={
                'UserId': user_id,  # Partition key
                'DataType#Timestamp': sort_key,  # Sort key
                'username': username,
                'email': email,
                'first_name': first_name,
                'last_name': last_name,
                'password': hashed_password,
                'security_question': security_question,
                'security_answer': security_answer,
                'profile_picture': default_profile_picture  
            }
        )

        return {
            'statusCode': 200,
            'body': json.dumps({
                'message': 'User successfully registered!',
                'UserId': user_id,
                'SortKey': sort_key,
                'ProfilePicture': default_profile_picture
            })
        }

    except ClientError as e:
        print(e)
        return {
            'statusCode': 500,
            'body': json.dumps({'message': 'Failed to register user', 'error': str(e)})
        }
    except Exception as e:
        print(e)
        return {
            'statusCode': 500,
            'body': json.dumps({'message': 'An unexpected error occurred', 'error': str(e)})
        }
