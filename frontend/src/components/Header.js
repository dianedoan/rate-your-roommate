import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

function Header() {
  return (
    <Navbar bg="light" expand="lg" className="mb-3">
      <Navbar.Brand href="/">Rate Your Roommate</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link href="/about">About Us</Nav.Link>
          <Nav.Link href="/terms">Terms & Conditions</Nav.Link>
          <Nav.Link href="/forgot-password">Forgot Password?</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
