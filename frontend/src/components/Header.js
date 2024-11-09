import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import './Header.css';
import Logo from '../assets/images/RYR_logo.svg'; 

function Header() {
  return (
    <Navbar bg="light" expand="lg" className="mb-3">
      <Navbar.Brand href="/">
        <img src={Logo} alt="Rate Your Roommate" className="navbar-logo" />
      </Navbar.Brand>
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
