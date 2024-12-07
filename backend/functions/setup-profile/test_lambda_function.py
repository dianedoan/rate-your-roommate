import json
from lambda_function import lambda_handler


def test_lambda_handler():
    # Simulated event with existing UserId and profile data
    event = {
        "body": json.dumps({
            "UserId": "...",  
            "DataType#Timestamp": "...",
            "aboutMe": "I enjoy hiking and coding.",
            "occupation": "Software Engineer",
            "country": "Canada",
            "state": "Alberta",
            "city": "Calgary",
            "preferences": ["Early Riser", "Non-Smoker", "Clean & Tidy"]
        }),
    }

    # Call the lambda_handler function
    response = lambda_handler(event, None)

    # Parse the response body
    response_body = json.loads(response.get("body", "{}"))

    # Assertions to validate the response
    assert response["statusCode"] == 200, f"Expected 200, got {response['statusCode']}"
    assert "message" in response_body, "Response body missing 'message' key"
    assert response_body["message"] == "Profile successfully updated!", f"Unexpected message: {response_body['message']}"

    print("Response:")
    print(json.dumps(response, indent=4))


if __name__ == "__main__":
    test_lambda_handler()
