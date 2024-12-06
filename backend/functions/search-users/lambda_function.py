import boto3
import json
from boto3.dynamodb.conditions import Attr

# Initialize DynamoDB client
dynamodb = boto3.resource('dynamodb', region_name='ca-central-1')
table = dynamodb.Table('RoommateRatings')

def lambda_handler(event, context):
    try:
        # Parse query parameters
        query_params = event.get('queryStringParameters', {})
        search_term = query_params.get('searchTerm', '').strip()

        # Validate input
        if not search_term:
            return {
                'statusCode': 400,
                'body': json.dumps({'message': 'Search term is required!'})
            }

        # Scan with filter expression
        response = table.scan(
            FilterExpression=(
                Attr('city').contains(search_term) |
                Attr('first_name').contains(search_term) |
                Attr('last_name').contains(search_term)
            )
        )

        # Extract matching items
        items = response.get('Items', [])
        if not items:
            return {
                'statusCode': 200,
                'body': json.dumps({'message': 'No results found.', 'results': []})
            }

        return {
            'statusCode': 200,
            'body': json.dumps({'message': 'Search results retrieved successfully.', 'results': items})
        }

    except Exception as e:
        print(f"Error: {e}")
        return {
            'statusCode': 500,
            'body': json.dumps({'message': 'An error occurred while performing the search.', 'error': str(e)})
        }
