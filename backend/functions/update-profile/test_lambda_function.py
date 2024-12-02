import json
from lambda_function import lambda_handler  # Ensure this matches the file name

def test_lambda_handler():
    test_user_id = "..."  # Replace with a valid UserId
    test_sort_key = "..."  # Replace with a valid DataType#Timestamp
    test_profile_data = {
        "aboutMe": "I love hiking and painting.",
        "preferences": ["Early Riser", "Non-Smoker"]
    }
    test_occupation = "Software Engineer"
    test_country = "USA"
    test_state = "California"
    test_city = "San Francisco"

    event = {
        "body": json.dumps({
            "UserId": test_user_id,
            "DataType#Timestamp": test_sort_key,
            "ProfileData": test_profile_data,
            "occupation": test_occupation,
            "country": test_country,
            "state": test_state,
            "city": test_city
        }),
    }

    response = lambda_handler(event, None)

    # Parse the response body
    response_body = json.loads(response.get("body", "{}"))

    # Assertions to verify the response
    assert response["statusCode"] == 200, f"Expected 200, got {response['statusCode']}"
    assert "message" in response_body, "Response body missing 'message' key"
    assert response_body["message"] == "Profile updated successfully!", f"Unexpected message: {response_body['message']}"

    print("Response:")
    print(json.dumps(response, indent=4))

if __name__ == "__main__":
    test_lambda_handler()
