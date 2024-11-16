import React from 'react';
import { Container, Nav } from 'react-bootstrap';
import {FaTwitter, FaInstagram, FaTiktok, FaFacebook} from 'react-icons/fa';


function Footer({ onForgotPasswordClick }) {
  return (
    <Container className="text-center mt-5 mb-3">
      <Nav className="justify-content-center">
        <Nav.Link href="/terms">Terms & Conditions</Nav.Link>
        <Nav.Link href="/about">About Us</Nav.Link>
        <Nav.Link href="#"onClick={onForgotPasswordClick}>Forgot Password?</Nav.Link>



        <Nav id="social-media-nav" className="justify-content-center">
        {/* Adding social media links here */}
        <Nav.Link href="https://twitter.com" target="_blank" aria-label="Twitter">
          <FaTwitter size={24} />
        </Nav.Link>
        <Nav.Link href="https://instagram.com" target="_blank" aria-label="Instagram">
          <FaInstagram size={24} />
        </Nav.Link>
        <Nav.Link href="https://tiktok.com" target="_blank" aria-label="TikTok">
          <FaTiktok size={24} />
        </Nav.Link>
      </Nav>
      </Nav>
    </Container>
  );
}

export default Footer;
