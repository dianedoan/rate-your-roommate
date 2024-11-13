import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './RegisterModal.css';

const RegisterModal = ({ onClose, onRegisterSuccess }) => {
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
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email.');
      return;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    //Faking submission, to test set profile modal
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onRegisterSuccess();  
      onClose();  
    }, 1000); 
    setIsSubmitting(false);
    onRegisterSuccess(); 
  };

  return (
    <Modal show onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title className="modal-title">Register</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formUsername">
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

          <Form.Group controlId="formEmail">
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

          <Form.Group controlId="formFirstName">
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

          <Form.Group controlId="formLastName">
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

          <Form.Group controlId="formPassword">
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

          <Button variant="primary" type="submit" onClick={handleSubmit} className="w-100">
            Register
          </Button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <div className="text-center w-100">
          <span>Already have an account? </span>
          <Button variant="link" onClick={onClose}>
            Login
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default RegisterModal;
