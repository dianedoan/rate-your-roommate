import json
from lambda_function import lambda_handler 

def test_lambda_handler():
    test_username = "mary"
    test_password = "123456"

    event = {
        "body": json.dumps({
            "username": test_username,
            "password": test_password
        }),
    }

    response = lambda_handler(event, None)

    # Parse the response body
    response_body = json.loads(response.get("body", "{}"))

    # Assertions to verify the response
    assert response["statusCode"] == 200, f"Expected 200, got {response['statusCode']}"
    assert "message" in response_body, "Response body missing 'message' key"
    assert response_body["message"] == "Login successful!", f"Unexpected message: {response_body['message']}"
    assert "UserId" in response_body, "Response body missing 'UserId' key"

    print("Response:")
    print(json.dumps(response, indent=4))

if __name__ == "__main__":
    test_lambda_handler()
