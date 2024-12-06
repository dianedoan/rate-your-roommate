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
        user_id = body.get('UserId') 
        data_type = body.get('DataType#Timestamp')
        about_me = body.get('aboutMe')
        occupation = body.get('occupation')
        country = body.get('country')
        state = body.get('state')
        city = body.get('city')
        preferences = body.get('preferences')

        # Validate required keys
        if not user_id or not data_type:
            return {
                'statusCode': 400,
                'body': json.dumps({'message': 'UserId and DataType#Timestamp are required.'})
            }

        # Prepare the update expressions
        update_expression = []
        expression_attribute_values = {}
        expression_attribute_names = {}

        # Check if ProfileData exists; initialize if necessary
        if about_me is not None or preferences is not None:
            existing_item = table.get_item(
                Key={'UserId': user_id, 'DataType#Timestamp': data_type}
            ).get('Item', {})

            if 'ProfileData' not in existing_item:
                # Initialize ProfileData map if it doesn't exist
                update_expression.append("ProfileData = :profileData")
                expression_attribute_values[":profileData"] = {
                    "aboutMe": about_me or "",
                    "preferences": preferences or []
                }
            else:
                # Update individual fields in ProfileData
                if about_me is not None:
                    update_expression.append("ProfileData.aboutMe = :aboutMe")
                    expression_attribute_values[":aboutMe"] = about_me
                if preferences is not None:
                    update_expression.append("ProfileData.preferences = :preferences")
                    expression_attribute_values[":preferences"] = preferences

        # Update other top-level fields
        if occupation is not None:
            update_expression.append("occupation = :occupation")
            expression_attribute_values[":occupation"] = occupation
        if country is not None:
            update_expression.append("country = :country")
            expression_attribute_values[":country"] = country
        if state is not None:
            update_expression.append("#state = :state")  # Reserved word handling
            expression_attribute_values[":state"] = state
            expression_attribute_names["#state"] = "state"
        if city is not None:
            update_expression.append("city = :city")
            expression_attribute_values[":city"] = city

        # Ensure there is something to update
        if not update_expression:
            return {
                'statusCode': 400,
                'body': json.dumps({'message': 'No valid fields provided for update.'})
            }

        # Construct UpdateExpression
        update_expression_str = "SET " + ", ".join(update_expression)

        # Perform the update in DynamoDB
        table.update_item(
            Key={
                'UserId': user_id,
                'DataType#Timestamp': data_type
            },
            UpdateExpression=update_expression_str,
            ExpressionAttributeValues=expression_attribute_values,
            ExpressionAttributeNames=expression_attribute_names if expression_attribute_names else None
        )

        # Successful response with userId
        return {
            'statusCode': 200,
            'body': json.dumps({
                'message': f"Profile for userId '{user_id}' successfully updated!",
                'userId': user_id,
                 'city': city 

            })
        }

    except ClientError as e:
        print("DynamoDB ClientError:", e.response['Error']['Message'])
        return {
            'statusCode': 500,
            'body': json.dumps({'message': 'Failed to update profile', 'error': str(e)})
        }
    except Exception as e:
        print("General Exception:", str(e))
        return {
            'statusCode': 500,
            'body': json.dumps({'message': 'An unexpected error occurred', 'error': str(e)})
        }
