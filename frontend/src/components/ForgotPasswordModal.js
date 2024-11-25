import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './Modal.css';

function ForgotPasswordModal({ onClose, onSubmit, isSuccess, securityQuestion, showPasswordResetForm, onSecuritySubmit, onPasswordReset, onForgotPasswordClick }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isResetSuccessful, setIsResetSuccessful] = useState(false);
  const [showModal, setShowModal] = useState(true); // State to control modal visibility

  const handleInitialSubmit = (e) => {
    e.preventDefault();
    onSubmit(username, email);
  };

  const handleSecuritySubmit = (e) => {
    e.preventDefault();
    onSecuritySubmit(securityAnswer);
  };

  const handlePasswordResetSubmit = (e) => {
    e.preventDefault();
    onPasswordReset(newPassword);
    setIsResetSuccessful(true);
  };

  // Determine title and subtitle based on state
  const renderModalTitle = () => {
    if (isResetSuccessful) return "Success!";
    if (showPasswordResetForm) return "Reset Your Password";
    if (isSuccess === null) return "Forgot Password?";
    if (isSuccess) return "Security Question";
    return "Failure!";
  };

  const renderModalSubtitle = () => {
    if (isResetSuccessful) return "";
    if (showPasswordResetForm) return "Enter your new password";
    if (isSuccess === null) return "Please enter your username and email";
    if (isSuccess) return "Provide the correct answer to your security question. proceed.";
    return "";
  };

  return (
    <Modal show={showModal} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title className="w-100 text-center">
          <div className="modal-title-main">{renderModalTitle()}</div>
          <div className="modal-title-sub">{renderModalSubtitle()}</div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isResetSuccessful ? (
          <div className="text-center">
            <h4>Your password has been reset successfully.</h4>
          </div>
        ) : isSuccess === null ? (
          // Initial form to collect username and email
          <Form onSubmit={handleInitialSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 mt-3">
              Submit
            </Button>
          </Form>
        ) : isSuccess && !showPasswordResetForm ? (
          // Form to answer the security question
          <Form onSubmit={handleSecuritySubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Security Question</Form.Label>
              <Form.Control
                type="text"
                value={securityQuestion}
                readOnly
                className="mb-2"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Your Answer</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your answer"
                value={securityAnswer}
                onChange={(e) => setSecurityAnswer(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 mt-3">
              Submit Answer
            </Button>
          </Form>
        ) : showPasswordResetForm ? (
          // Form to reset password
          <Form onSubmit={handlePasswordResetSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 mt-3">
              Reset Password
            </Button>
          </Form>
        ) : (
          <div className="text-center">
            <h4>The provided username and email address do not match.</h4>
            <Button 
              variant="primary" 
              className="w-100 mt-3" 
              onClick={() => {
                onForgotPasswordClick(); // Call the prop function
              }}
            >
              Try Again
            </Button>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
}

export default ForgotPasswordModal;
