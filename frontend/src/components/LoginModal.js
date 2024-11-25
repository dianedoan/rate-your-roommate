import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { FaGoogle, FaFacebook, FaEye, FaEyeSlash } from 'react-icons/fa';
import { userList } from '../data/userData'; // Import registered users
import './Modal.css';

const LoginModal = ({ onClose, onForgotPasswordClick, onLoginSuccess }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Track error messages
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordToggle = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store auth token and user data
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      onLoginSuccess();
      onClose();

    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }

    // Validate credentials
    /*const user = userList.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      console.log('Login successful for user:', user);
      setError('');
      onClose(); // Close the modal
      onLoginSuccess(user); // Trigger the login success callback
    } else {
      setError('Invalid username or password');
    }*/

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
