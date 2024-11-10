import React from 'react';
import { Container, Nav } from 'react-bootstrap';

function Footer({ onForgotPasswordClick }) {
  return (
    <Container className="text-center mt-5 mb-3">
      <Nav className="justify-content-center">
        <Nav.Link href="/terms">Terms & Conditions</Nav.Link>
        <Nav.Link href="/about">About Us</Nav.Link>
        <Nav.Link href="#"onClick={onForgotPasswordClick}>Forgot Password?</Nav.Link>
      </Nav>
    </Container>
  );
}

export default Footer;
