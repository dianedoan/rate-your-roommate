import React from 'react';
import { Container, Nav } from 'react-bootstrap';
import './Footer.css';

function Footer({ onForgotPasswordClick }) {
  return (
    <section className="footer-section">
      <Container className="text-center">
        <Nav className="justify-content-center">
          <Nav.Link href="/terms">Terms & Conditions</Nav.Link>
          <Nav.Link href="/about">About Us</Nav.Link>
          <Nav.Link href="#"onClick={onForgotPasswordClick}>Forgot Password?</Nav.Link>
        </Nav>
      </Container>
    </section>
  );
}

export default Footer;
