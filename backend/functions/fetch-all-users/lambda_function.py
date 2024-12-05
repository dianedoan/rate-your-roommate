import boto3
import json

# Initialize the DynamoDB client
dynamodb = boto3.resource('dynamodb', region_name='ca-central-1')
table = dynamodb.Table('RoommateRatings')  

def lambda_handler(event, context):
    try:
        # Scan the table with a filter to include only items where DataType#Timestamp starts with 'Signup#'
        response = table.scan(
            FilterExpression="begins_with(#dataType, :prefix)",
            ExpressionAttributeNames={
                "#dataType": "DataType#Timestamp"
            },
            ExpressionAttributeValues={
                ":prefix": "Signup#"
            }
        )

        # Get all items from the response
        users = response.get('Items', [])

        # Paginate if necessary
        while 'LastEvaluatedKey' in response:
            response = table.scan(
                FilterExpression="begins_with(#dataType, :prefix)",
                ExpressionAttributeNames={
                    "#dataType": "DataType#Timestamp"
                },
                ExpressionAttributeValues={
                    ":prefix": "Signup#"
                },
                ExclusiveStartKey=response['LastEvaluatedKey']
            )
            users.extend(response.get('Items', []))

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
