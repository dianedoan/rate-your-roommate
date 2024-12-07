import boto3
import json

dynamodb = boto3.resource('dynamodb', region_name='ca-central-1')
table = dynamodb.Table('RoommateRatings')

def lambda_handler(event, context):
    try:
        user_id = event.get("queryStringParameters", {}).get("UserId")
        sort_key = event.get("queryStringParameters", {}).get("SortKey")  

        if not user_id or not sort_key:
            return {
                "statusCode": 400,
                "body": json.dumps({"message": "UserId and SortKey are required."}),
            }

        # Retrieve item from DynamoDB
        response = table.get_item(Key={"UserId": user_id, "DataType#Timestamp": sort_key})

        # Check if item exists
        if "Item" not in response:
            return {
                "statusCode": 404,
                "body": json.dumps({"message": "User not found."}),
            }

        return {
            "statusCode": 200,
            "body": json.dumps(response["Item"]),
        }

    except Exception as e:
        print("Error:", str(e))
        return {
            "statusCode": 500,
            "body": json.dumps({"message": "An unexpected error occurred.", "error": str(e)}),
        }
