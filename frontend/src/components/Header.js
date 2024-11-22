import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { useLocation, useMatch } from 'react-router-dom';
import Logo from '../assets/images/RYR_logo.svg'; 
import home from '../assets/images/button-icons/home.svg'; 
import search from '../assets/images/button-icons/search.svg';
import messages from '../assets/images/button-icons/messages.svg'; 
import heart from '../assets/images/button-icons/heart.svg'; 
import profile from '../assets/images/button-icons/profile.svg'; 

import './Header.css';

function Header({ onLoginClick, onRegisterClick }) {
  const location = useLocation(); // Get the current route

  // Check current routes
  const isLandingPage = location.pathname === '/';
  const isTermsPage = location.pathname === '/terms';
  const isAboutPage = location.pathname === '/about';
  const isHomePage = location.pathname === '/home';
  const isReviewPage = useMatch('/reviews/:userId');
  const isCreateReviewPage = useMatch('/create-review/:userId');
  const isSearchPage = location.pathname === '/search';
  const isSavedRoommatesPage = location.pathname === '/saved';

  return (
    <Navbar bg="white" expand="lg" className="navbar" sticky="top">
      <Navbar.Brand href="/">
        <img src={Logo} alt="Rate Your Roommate" className="navbar-logo" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto d-flex">
          {/* Conditionally render buttons based on the current route */}
          {(isLandingPage || isTermsPage || isAboutPage) && (
            <>
              <button className="nav-btn primary-btn" onClick={onLoginClick}>
                Login
              </button>
              <button className="nav-btn secondary-btn" onClick={onRegisterClick}>
                Register
              </button>
            </>
          )}
          {(isHomePage || isReviewPage || isCreateReviewPage || isSearchPage || isSavedRoommatesPage) && (
            <>
              <Navbar.Brand href="/home">
                <img src={home} alt="home-icon" className="navbar-home" />
              </Navbar.Brand>
              <Navbar.Brand href="/search">
                <img src={search} alt="search-icon" className="navbar-search" />
              </Navbar.Brand>
              <Navbar.Brand href="/messages">
                <img src={messages} alt="messages-icon" className="navbar-messages" />
              </Navbar.Brand>
              <Navbar.Brand href="/saved">
                <img src={heart} alt="heart-icon" className="navbar-heart" />
              </Navbar.Brand>
              <Navbar.Brand href="/profile">
                <img src={profile} alt="profile-icon" className="navbar-profile" />
              </Navbar.Brand>
            </>
          )}

        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
