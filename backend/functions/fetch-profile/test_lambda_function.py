import json
from lambda_function import lambda_handler

def test_lambda_handler():
    test_user_id = "...."  # Replace with a valid UserId
    test_sort_key = "...."  # Replace with a valid DataType#Timestamp

    event = {
        "queryStringParameters": {
            "UserId": test_user_id,
            "SortKey": test_sort_key
        }
    }

    response = lambda_handler(event, None)

    # Parse the response body
    response_body = json.loads(response.get("body", "{}"))

    # Assertions to verify the response
    assert response["statusCode"] == 200, f"Expected 200, got {response['statusCode']}"
    assert "UserId" in response_body, "Response body missing 'UserId' key"
    assert response_body["UserId"] == test_user_id, f"Unexpected UserId: {response_body['UserId']}"
    assert "DataType#Timestamp" in response_body, "Response body missing 'DataType#Timestamp' key"
    assert response_body["DataType#Timestamp"] == test_sort_key, f"Unexpected SortKey: {response_body['DataType#Timestamp']}"

    print("Response:")
    print(json.dumps(response, indent=4))

if __name__ == "__main__":
    test_lambda_handler()
