import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FaChevronDown } from "react-icons/fa";
import "./Modal.css";
import config from "./config.json";

const API_BASE_URL = config.apiBaseUrl;

const RegisterModal = ({ onClose, onRegisterSuccess, onLoginClick }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    securityQuestion: "",
    securityAnswer: "",
    agreeToTerms: false,
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous error
    setError("");

    // Frontend validation
    if (
      !formData.username ||
      !formData.email ||
      !formData.firstName ||
      !formData.lastName ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.securityQuestion ||
      !formData.securityAnswer ||
      !formData.agreeToTerms
    ) {
      setError("All fields are required!");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Show loading state
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          first_name: formData.firstName,
          last_name: formData.lastName,
          password: formData.password,
          security_question: formData.securityQuestion,
          security_answer: formData.securityAnswer,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        // Registration successful
        console.log("User registered:", result);
        onRegisterSuccess(result); // Call the success handler
        onClose(); // Close the modal
      } else {
        // Handle error response from Lambda
        console.error("Registration failed:", result.message);
        setError(result.message || "Failed to register user.");
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal show onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title className="w-100 text-center">
          <div className="modal-title-main">Create an Account</div>
          <div className="modal-title-sub">Sign up to get started!</div>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formUsername" className="form-subtitle mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formEmail" className="mb-3 mt-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formFirstName" className="mb-3 mt-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your first name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formLastName" className="mb-3 mt-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your last name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formPassword" className="mb-3 mt-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formConfirmPassword" className="mb-3 mt-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Re-enter your password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formSecurityQuestion" className="mb-3">
            <Form.Label>Security Question</Form.Label>
            <div className="icon-container">
              <Form.Control
                as="select"
                name="securityQuestion"
                value={formData.securityQuestion}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select a security question
                </option>
                <option value="What is your pet's name?">
                  What is your pet's name?
                </option>
                <option value="What is your mother's maiden name?">
                  What is your mother's maiden name?
                </option>
                <option value="What was your first car?">
                  What was your first car?
                </option>
                <option value="What is the name of your favorite teacher?">
                  What is the name of your favorite teacher?
                </option>
              </Form.Control>
              <FaChevronDown className="dropdown-icon" />
            </div>
          </Form.Group>

          <Form.Group controlId="formSecurityAnswer" className="mb-3 mt-3">
            <Form.Label>Security Answer</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your security answer"
              name="securityAnswer"
              value={formData.securityAnswer}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formAgreeToTerms" className="mt-3 mb-3">
            <Form.Check
              type="checkbox"
              label="I agree to the Terms and Conditions"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {error && <div className="text-danger mb-3">{error}</div>}

          <Button
            variant="primary"
            type="submit"
            className="w-100"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Registering..." : "Register"}
          </Button>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <div className="text-center w-100">
          <span>Already have an account? </span>
          <Button className="link-btn" variant="link" onClick={onLoginClick}>
            Login
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default RegisterModal;
