import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './ForgotPasswordModal.css';

function ForgotPasswordModal({ onClose, onSubmit, isSuccess }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(username, email); 
  };

  return (
    <Modal show={true} onHide={onClose}>
     <Modal.Header closeButton>
      <Modal.Title className="w-100 text-center">
        <div className="modal-title-main">Forgot password?</div>
        <div className="modal-title-sub">Please enter your username and email</div>
        </Modal.Title>      
        </Modal.Header>
      <Modal.Body>
        {isSuccess === null ? (
          <Form onSubmit={handleSubmit}>
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
            <Button variant="primary" type="submit" className="w-100">
              Submit
            </Button>
          </Form>
        ) : isSuccess ? (
          <div className="text-center">
            <h5>Success!</h5>
            <p>A reset link has been sent to your email.</p>
            <Button variant="primary" onClick={onClose}>Close</Button>
          </div>
        ) : (
          <div className="text-center">
            <h5>Failure!</h5>
            <p>Sorry, we could not find that email address.</p>
            <Button variant="primary" onClick={onClose}>Close</Button>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default ForgotPasswordModal;
