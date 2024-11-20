import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { FaGoogle, FaFacebook, FaEye, FaEyeSlash } from 'react-icons/fa';
import './Modal.css';

const LoginModal = ({ onClose, onForgotPasswordClick }) => {
  const [passwordVisible, setPasswordVisible] = useState(false); // To toggle password visibility
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handlePasswordToggle = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add login logic here
    console.log('Logging in with', { username, password });

    // Error messages
    // if (!username) {
    //   setError('Please enter a username.');
    //   return;
    // }

    // if (!formData.password) {
    //   setError('Please enter a password.');
    //   return;
    // }

    onClose(); // Close the modal after login attempt
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
                type={passwordVisible ? 'text' : 'password'}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div
                className="password-icon"
                onClick={handlePasswordToggle}
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </Form.Group>
          <Button 
            className="link-btn" variant="link" onClick={() => {
              onForgotPasswordClick(); // Call the prop function
            }}>Forgot Password?
          </Button>

          <Button variant="primary" type="submit" className="w-100 mt-3">
            Login
          </Button>
        </Form>
        <div className="separator">
            <div className="flex-grow-1 border-top"></div>
              <span className="mx-2 text-center small">or sign in with</span>
            <div className="flex-grow-1 border-top"></div>
          </div>
        <div className="social-login d-flex flex-column align-items-center">
          <Button className="social-button" variant="outline-danger" block>
            <FaGoogle /> Login with Google
          </Button>
          <Button className="social-button" variant="outline-primary" block>
            <FaFacebook /> Login with Facebook
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
