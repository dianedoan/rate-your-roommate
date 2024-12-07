import boto3
import json

# Initialize the DynamoDB client
dynamodb = boto3.resource('dynamodb', region_name='ca-central-1')
table = dynamodb.Table('RoommateRatings')  

def lambda_handler(event, context):
    try:
        # Extract username and email from query parameters (for GET request)
        query_params = event.get("queryStringParameters", {})
        username = query_params.get("username")
        email = query_params.get("email")

        # Validate input
        if not username or not email:
            return {
                "statusCode": 400,
                "body": json.dumps({"message": "Username and email are required!"})
            }

        # Scan the table with a FilterExpression
        response = table.scan(
            FilterExpression="username = :username AND email = :email",
            ExpressionAttributeValues={
                ":username": username,
                ":email": email,
            }
        )

        # Extract items from the response
        items = response.get("Items", [])
        if not items:
            return {
                "statusCode": 404,
                "body": json.dumps({"message": "Username/email not found!"})
            }

        # Retrieve the first matching item
        user = items[0]

        # Return the security question and answer
        return {
            "statusCode": 200,
            "body": json.dumps({
                "UserId": user["UserId"],
                "Sortkey": user["DataType#Timestamp"],
                "security_question": user["security_question"],
                "security_answer": user["security_answer"]  
            })
        }

    except Exception as e:
        print(f"Error: {e}")
        return {
            "statusCode": 500,
            "body": json.dumps({"message": "An error occurred while validating user.", "error": str(e)})
        }
