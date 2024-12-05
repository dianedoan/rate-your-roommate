import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FaGoogle, FaFacebook, FaEye, FaEyeSlash } from "react-icons/fa";
import "./Modal.css";
import config from "./config.json";

const LoginModal = ({ onClose, onForgotPasswordClick, onLoginSuccess, onGuestLogin }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Track error messages
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission state

  const handlePasswordToggle = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true); // Show a loading state
    setError(""); // Clear previous errors

    try {
      const response = await fetch(`${config.apiBaseUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Login successful:", result);
        onLoginSuccess(result); // Pass the entire result
      } else {
        console.error("Login failed:", result.message);
        setError(result.message || "Invalid username or password.");
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false); // Remove loading state
    }
  };

  return (
    <Modal show onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title className="w-100 text-center">
          <div className="modal-title-main">Welcome back :)</div>
          <div className="modal-title-sub">Please enter your login details</div>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="username" className="form-subtitle mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="password" className="mb-3 mt-3">
            <Form.Label>Password</Form.Label>
            <div className="icon-container">
              <Form.Control
                type={passwordVisible ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="password-icon" onClick={handlePasswordToggle}>
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </Form.Group>

          {error && <div className="text-danger mb-3">{error}</div>}

          <Button
            className="link-btn"
            variant="link"
            onClick={onForgotPasswordClick}
          >
            Forgot Password?
          </Button>

          <Button
            variant="primary"
            type="submit"
            className="w-100 mt-3"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </Form>
        <div className="separator">
          <div className="flex-grow-1 border-top"></div>
          {/* <span className="mx-2 text-center small"></span> */}
          <div className="flex-grow-1 border-top"></div>
        </div>
        <div className="social-login d-flex flex-column align-items-center">
          <Button
              className="w-100 mt-3 guest-button"
              variant="outline-secondary"
              block
              onClick={onGuestLogin}
            >
             Continue as Guest
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
