import json
from main import lambda_handler


def test_lambda_handler():
    event = {
        "body": json.dumps({
            "username": "testuser",
            "email": "testuser@example.com",
            "first_name": "Test",
            "last_name": "User",
            "password": "password123",
            "security_question": "What is your favorite color?",
            "security_answer": "Blue"
        }),
    }

    response = lambda_handler(event, None)

    # Parse the response body 
    response_body = json.loads(response.get("body", "{}"))

    assert response["statusCode"] == 200, f"Expected 200, got {response['statusCode']}"
    assert "message" in response_body, "Response body missing 'message' key"
    assert response_body["message"] == "User successfully registered!", f"Unexpected message: {response_body['message']}"

    print("Response:")
    print(json.dumps(response, indent=4))

if __name__ == "__main__":
    test_lambda_handler()
