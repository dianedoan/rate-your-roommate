import boto3
import json
from botocore.exceptions import ClientError

# Initialize DynamoDB client
dynamodb = boto3.resource('dynamodb', region_name='ca-central-1')
table = dynamodb.Table('RoommateRatings')

def lambda_handler(event, context):
    try:
        body = json.loads(event['body'])
        user_id = body.get('UserId')
        sort_key = body.get('DataType#Timestamp')
        profile_data = body.get('ProfileData')  # Contains fields like aboutMe and preferences
        occupation = body.get('occupation')
        country = body.get('country')
        state = body.get('state')  # Reserved keyword
        city = body.get('city')

        # Validate input
        if not user_id or not sort_key:
            return {
                'statusCode': 400,
                'body': json.dumps({'message': 'UserId and DataType#Timestamp are required.'})
            }

        # Prepare the update expression and attribute values
        update_expression = "SET "
        expression_attribute_values = {}
        expression_attribute_names = {}

        # Add ProfileData (only includes aboutMe and preferences)
        if profile_data:
            for key, value in profile_data.items():
                update_expression += f"ProfileData.{key} = :{key}, "
                expression_attribute_values[f":{key}"] = value

        # Add other top-level fields
        if occupation:
            update_expression += "occupation = :occupation, "
            expression_attribute_values[":occupation"] = occupation
        if country:
            update_expression += "country = :country, "
            expression_attribute_values[":country"] = country
        if state:
            # Use an alias for "state"
            update_expression += "#state = :state, "
            expression_attribute_values[":state"] = state
            expression_attribute_names["#state"] = "state"
        if city:
            update_expression += "city = :city, "
            expression_attribute_values[":city"] = city

        # Remove the trailing comma and space
        update_expression = update_expression.rstrip(", ")

        # Perform the update
        table.update_item(
            Key={
                'UserId': user_id,
                'DataType#Timestamp': sort_key
            },
            UpdateExpression=update_expression,
            ExpressionAttributeValues=expression_attribute_values,
            ExpressionAttributeNames=expression_attribute_names
        )

        return {
            'statusCode': 200,
            'body': json.dumps({'message': 'Profile updated successfully!'})
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
            'body': json.dumps({'message': 'An unexpected error occurred.', 'error': str(e)})
        }
