import React, { useState, useEffect } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import Logo from '../assets/images/RYR_logo.svg'; 
import home from '../assets/images/button-icons/home.svg'; 
import search from '../assets/images/button-icons/search.svg';
import messages from '../assets/images/button-icons/messages.svg'; 
import heart from '../assets/images/button-icons/heart.svg'; 
import profile from '../assets/images/button-icons/profile.svg'; 

import './Header.css';

function Header({ onLoginClick, onRegisterClick }) {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 992); // Set initial mobile state

    // Update mobile state besed on window resize
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 991);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
        <Navbar bg="white" expand="lg" className="navbar" sticky="top">
            <Navbar.Brand href="/">
                <img src={Logo} alt="Rate Your Roommate" className="navbar-logo" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto d-flex">
                    <button className="nav-btn primary-btn" onClick={onLoginClick}>
                        Login
                    </button>
                    <button className="nav-btn secondary-btn" onClick={onRegisterClick}>
                        Register
                    </button>
                    {!isMobile && (
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

        {/* Sticky bottom navigation bar for mobile screens */}
        <div className={`bottom-navbar d-block d-lg-none ${isMobile ? '' : 'd-none'}`}>
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
        </>
    );
}

export default Header;
