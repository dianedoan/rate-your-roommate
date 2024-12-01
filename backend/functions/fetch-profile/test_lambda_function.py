import json
from lambda_function_fetch_profile import lambda_handler  # Replace with the actual name of your fetch-profile Lambda file

def test_fetch_profile_handler():
    test_user_id = "12345"  # Replace with an actual UserId in your DynamoDB table

    event = {
        "queryStringParameters": {
            "UserId": test_user_id
        }
    }

    response = lambda_handler(event, None)

    # Parse the response body
    response_body = json.loads(response.get("body", "{}"))

    # Assertions to verify the response
    assert response["statusCode"] == 200, f"Expected 200, got {response['statusCode']}"
    assert "UserId" in response_body, "Response body missing 'UserId' key"
    assert response_body["UserId"] == test_user_id, f"Unexpected UserId: {response_body['UserId']}"
    assert "description" in response_body, "Response body missing 'description' key"
    assert "preferences" in response_body, "Response body missing 'preferences' key"

    print("Response:")
    print(json.dumps(response, indent=4))

if __name__ == "__main__":
    test_fetch_profile_handler()
