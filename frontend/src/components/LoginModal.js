import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { FaGoogle, FaFacebook, FaEye, FaEyeSlash } from 'react-icons/fa';
import './Login.css';

const LoginModal = ({ onClose }) => {
  const [passwordVisible, setPasswordVisible] = useState(false); // To toggle password visibility
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handlePasswordToggle = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add login logic here
    console.log('Logging in with', { email, password });
    onClose(); // Close the modal after login attempt
  };

  return (
    <Modal show onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <div className="password-container">
              <Form.Control
                type={passwordVisible ? 'text' : 'password'}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="password-toggle"
                onClick={handlePasswordToggle}
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </Form.Group>

          <Button variant="primary" type="submit" block>
            Login
          </Button>
        </Form>
        <div className="social-login">
          <Button variant="outline-danger" block>
            <FaGoogle /> Login with Google
          </Button>
          <Button variant="outline-primary" block>
            <FaFacebook /> Login with Facebook
          </Button>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LoginModal;
