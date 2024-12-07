import boto3
import json

# Initialize the DynamoDB client
dynamodb = boto3.resource('dynamodb', region_name='ca-central-1')
table = dynamodb.Table('RoommateRatings')  

def lambda_handler(event, context):
    try:
        # Perform a scan with the corrected prefix
        response = table.scan(
            FilterExpression="begins_with(#dataType, :prefix)",
            ExpressionAttributeNames={
                "#dataType": "DataType#Timestamp"
            },
            ExpressionAttributeValues={
                ":prefix": "SignUp#"  
            }
        )

        # Get all items from the response
        users = response.get('Items', [])
        print("Filtered Items: ", users)  

        # Handle pagination if necessary
        while 'LastEvaluatedKey' in response:
            response = table.scan(
                FilterExpression="begins_with(#dataType, :prefix)",
                ExpressionAttributeNames={
                    "#dataType": "DataType#Timestamp"
                },
                ExpressionAttributeValues={
                    ":prefix": "SignUp#"  
                },
                ExclusiveStartKey=response['LastEvaluatedKey']
            )
            users.extend(response.get('Items', []))

        # Return users
        return {
            'statusCode': 200,
            'body': json.dumps({'users': users})
        }

    except Exception as e:
        print(f"Error: {e}")
        return {
            'statusCode': 500,
            'body': json.dumps({'message': 'An error occurred while retrieving users.', 'error': str(e)})
        }
