import React, { useState, useEffect } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import Logo from '../assets/images/RYR_logo.svg'; 
import home from '../assets/images/button-icons/home.svg'; 
import search from '../assets/images/button-icons/search.svg';
import messages from '../assets/images/button-icons/messages.svg'; 
import heart from '../assets/images/button-icons/heart.svg'; 
import profile from '../assets/images/button-icons/profile.svg'; 
import config from "./config.json";
import './Header.css';

function Header({ onLoginClick, onRegisterClick, userId, sortKey }) {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 992); // Set initial mobile state
    const [userProfile, setUserProfile] = useState('Guest');
    const [isLoggedIn, setIsLoggedIn] = useState(false); // New state to track login status

    useEffect(() => {
        if (userId && sortKey) {
            console.log(
            "useEffect triggered with userId and sortKey:",
            userId,
            sortKey
            );

            // Fetch profile data from API
            const fetchProfile = async () => {
                console.log(
                    "fetchProfile triggered with userId:",
                    userId,
                    "and sortKey:",
                    sortKey
                );
                if (!userId || !sortKey) {
                    setError("UserId or SortKey is missing.");
                    return;
                }

                const url = `${config.apiBaseUrl}/fetch-profile?UserId=${userId}&SortKey=${encodeURIComponent(sortKey)}`;
                // const url = ''; // for testing
                console.log("Constructed URL:", url);

                try {
                    const response = await fetch(url);
                    
                    if (!response.ok) throw new Error("Failed to fetch profile data.");

                    const data = await response.json();
                    console.log("fetchProfile: Fetched data:", data);
                    setUserProfile(data);
                    setIsLoggedIn(true); // Set login status to true if profile is fetched successfully

                } catch (err) {
                    console.error("Header: Error fetching data:", err.message);
                    setUserProfile('Guest');
                    setIsLoggedIn(false); // Ensure logged-in status is false if there's an error
                }
            };
            fetchProfile();
        } else {
            console.log("useEffect skipped: userId or sortKey is null.");
        }
    }, [userId, sortKey]);

    // Update mobile state based on window resize
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
            <Navbar.Brand href={"/"}>
                <img src={Logo} alt="Rate Your Roommate" className="navbar-logo" />
            </Navbar.Brand>
            {!isMobile && <Navbar.Toggle aria-controls="basic-navbar-nav" />}
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto d-flex">
                    {/* {isLoggedIn && (
                        <span className="navbar-username">
                            Welcome, {userProfile?.username}
                        </span>
                        
                    )} */}

                    {!isLoggedIn && (
                        <>
                            {/* <span className="navbar-username">
                                Welcome, Guest
                            </span> */}
                            <button className="nav-btn primary-btn" onClick={onLoginClick}>
                                Login
                            </button>
                            <button className="nav-btn secondary-btn" onClick={onRegisterClick}>
                                Register
                            </button>
                        </>
                    )}
                    
                    {/* Conditionally render navigation buttons based on login status */}
                    {isLoggedIn && !isMobile && (
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
        {isLoggedIn && isMobile && (
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
