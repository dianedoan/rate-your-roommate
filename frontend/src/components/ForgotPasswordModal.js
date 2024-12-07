import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "./Modal.css";
import config from "./config.json";

function ForgotPasswordModal({
  show, // Only keeping the necessary props
  onClose,
}) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isResetSuccessful, setIsResetSuccessful] = useState(false);
  const [showPasswordResetForm, setShowPasswordResetForm] = useState(false);
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [correctSecurityAnswer, setCorrectSecurityAnswer] = useState(""); // Store the correct answer
  const [userId, setUserId] = useState("");
  const [sortKey, setSortKey] = useState("");
  const [error, setError] = useState(null);

  const handleInitialSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch(
        `${
          config.apiBaseUrl
        }/get-security-question?username=${encodeURIComponent(
          username
        )}&email=${encodeURIComponent(email)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();
      if (response.ok) {
        setUserId(result.UserId);
        setSortKey(result.Sortkey);
        setSecurityQuestion(result.security_question);
        setCorrectSecurityAnswer(result.security_answer); // Store the correct answer
      } else {
        setError(result.message || "Failed to fetch security question.");
      }
    } catch (error) {
      console.error("Error fetching security question:", error);
      setError("An error occurred. Please try again.");
    }
  };

  const handleSecuritySubmit = (e) => {
    e.preventDefault();

    if (securityAnswer.trim() === "") {
      setError("Security answer is required.");
      return;
    }

    if (securityAnswer === correctSecurityAnswer) {
      setShowPasswordResetForm(true);
    } else {
      setError("Incorrect security answer.");
    }
  };

  const handlePasswordResetSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch(`${config.apiBaseUrl}/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          sortKey: sortKey,
          newPassword: newPassword,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        setIsResetSuccessful(true);
      } else {
        setError(result.message || "Failed to reset password.");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      setError("An error occurred. Please try again.");
    }
  };

  const renderModalTitle = () => {
    if (isResetSuccessful) return "Success!";
    if (showPasswordResetForm) return "Reset Your Password";
    if (securityQuestion) return "Security Question";
    return "Forgot Password?";
  };

  const renderModalSubtitle = () => {
    if (isResetSuccessful) return "Your password has been reset successfully.";
    if (showPasswordResetForm) return "Enter your new password";
    if (securityQuestion)
      return "Provide the correct answer to your security question.";
    return "Enter your username and email to proceed.";
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <div>{renderModalTitle()}</div>
          <div>{renderModalSubtitle()}</div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isResetSuccessful ? (
          <div className="text-center">Password reset successful!</div>
        ) : securityQuestion ? (
          !showPasswordResetForm ? (
            <Form onSubmit={handleSecuritySubmit}>
              <Form.Group>
                <Form.Label>Security Question</Form.Label>
                <Form.Control type="text" value={securityQuestion} readOnly />
              </Form.Group>
              <Form.Group>
                <Form.Label>Your Answer</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your answer"
                  value={securityAnswer}
                  onChange={(e) => setSecurityAnswer(e.target.value)}
                />
              </Form.Group>
              {error && <p className="text-danger">{error}</p>}
              <Button type="submit" className="mt-3 w-100">
                Submit
              </Button>
            </Form>
          ) : (
            <Form onSubmit={handlePasswordResetSubmit}>
              <Form.Group>
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </Form.Group>
              {error && <p className="text-danger">{error}</p>}
              <Button type="submit" className="mt-3 w-100">
                Reset Password
              </Button>
            </Form>
          )
        ) : (
          <Form onSubmit={handleInitialSubmit}>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            {error && <p className="text-danger">{error}</p>}
            <Button type="submit" className="mt-3 w-100">
              Submit
            </Button>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default ForgotPasswordModal;
