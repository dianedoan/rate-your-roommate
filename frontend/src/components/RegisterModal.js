import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './Modal.css';
import './RegisterModal.css';

const RegisterModal = ({ onClose, onRegisterSuccess, onLoginClick }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    agreeToTerms: false,
  });

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); 

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add form validation here and submit logic
    console.log('Form submitted:', formData);

    // Error messages
    if (!formData.username) {
      setError('Please enter a username.');
      return;
    }

    if (!formData.email.includes('@')) {
      setError('Please enter a valid email.');
      return;
    }

    if (!formData.firstName) {
      setError('Please enter your first name.');
      return;
    }

    if (!formData.lastName) {
      setError('Please enter your last name.');
      return;
    }

    if (!formData.password) {
      setError('Please enter a password.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (formData.agreeToTerms == false) {
      setError('You must agree to the Terms and Conditions.');
      return;
    }

    // Faking submission, to test set profile modal
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onRegisterSuccess();  
      onClose();  
    }, 1000); 
    // setIsSubmitting(false);
    // onRegisterSuccess(); 
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
          {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}
          <Button variant="primary" type="submit" onClick={handleSubmit} className="w-100" disabled={isSubmitting}>
            {isSubmitting ? 'Registering...' : 'Register'}
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
