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
  const isMessagesPage = location.pathname === '/messages';
  const isSavedRoommatesPage = location.pathname === '/saved';
  const isUserProfilePage = location.pathname === '/profile';
  const isEditProfilePage = location.pathname === '/edit-profile';

  // Determine if Navbar.Toggle should be shown
  const showNavbarToggle = !(isHomePage || isReviewPage || isCreateReviewPage || isSearchPage || isMessagesPage || isSavedRoommatesPage || isUserProfilePage || isEditProfilePage);
  
  // Determine if the sticky bottom bar should be shown (mobile screens and specific pages)
  const showBottomNav = (isHomePage || isReviewPage || isCreateReviewPage || isSearchPage || isMessagesPage || isSavedRoommatesPage || isUserProfilePage || isEditProfilePage);

  // Determine if the icons should be hidden (on landing, terms, or about pages)
  const hideHeaderIcons = (isLandingPage || isTermsPage || isAboutPage);

  return (
    <>
      <Navbar bg="white" expand="lg" className="navbar" sticky="top">
        <Navbar.Brand href="/">
          <img src={Logo} alt="Rate Your Roommate" className="navbar-logo" />
        </Navbar.Brand>
        {showNavbarToggle && <Navbar.Toggle aria-controls="basic-navbar-nav" />}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto d-flex">
            {/* Conditionally render login and register buttons */}
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
            {/* Conditionally render header icons unless on landing, terms, or about pages */}
            {!hideHeaderIcons && (
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

      {/* Sticky bottom navigation bar for mobile screens on specific pages */}
      {showBottomNav && (
        <div className="bottom-navbar d-block d-lg-none">
          <Navbar bg="white" className="bottom-navbar-content">
            <Nav className="w-100 d-flex justify-content-between">
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
            </Nav>
          </Navbar>
        </div>
      )}
    </>
  );
}

export default Header;
