import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import Logo from '../assets/images/RYR_logo.svg'; 
import './Header.css';

function Header ({onLoginClick, onRegisterClick}) {
  return (
    <Navbar bg="white" expand="lg" className="navbar" sticky="top">
      <Navbar.Brand href="/">
        <img src={Logo} alt="Rate Your Roommate" className="navbar-logo" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto d-flex">
          <button className="nav-btn submit-btn" onClick={onLoginClick}>Login</button>
          <button className="nav-btn cancel-btn" onClick={onRegisterClick}>Register</button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
