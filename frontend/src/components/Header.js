import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

function Header() {
  return (
    <Navbar bg="light" expand="lg" className="mb-3">
      <Navbar.Brand href="/">Rate Your Roommate</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto d-flex gap-3">
          <button className="login-button">Login</button>
          <button className="register-button">Register</button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
