import boto3
import json
from collections import defaultdict
from boto3.dynamodb.conditions import Attr, Key

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

        # Scan for profiles that match the search term
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

        # Collect UserIds from profiles
        user_ids = [item['UserId'] for item in items]

        # Fetch reviews for the matching UserIds
        review_response = table.scan(
            FilterExpression=Attr("RecipientId").is_in(user_ids) &
                             Attr("DataType#Timestamp").begins_with("Review#"),
            ProjectionExpression="RecipientId, Score"
        )

        reviews = review_response.get('Items', [])
        scores = defaultdict(list)
        for review in reviews:
            recipient_id = review['RecipientId']
            scores[recipient_id].append(float(review['Score']))

        # Calculate average scores
        average_scores = {
            recipient_id: sum(user_scores) / len(user_scores)
            for recipient_id, user_scores in scores.items()
        }

        # Add scores to the original items
        results = []
        for item in items:
            user_id = item['UserId']
            item['AverageScore'] = average_scores.get(user_id, 0)
            results.append(item)

        return {
            'statusCode': 200,
            'body': json.dumps({'message': 'Search results retrieved successfully.', 'results': results})
        }

    except Exception as e:
        print(f"Error: {e}")
        return {
            'statusCode': 500,
            'body': json.dumps({'message': 'An error occurred while performing the search.', 'error': str(e)})
        }
