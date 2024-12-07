import React, { useState, useEffect } from "react";
import { Navbar, Nav } from "react-bootstrap";
import Logo from "../assets/images/RYR_logo.svg";
import home from "../assets/images/button-icons/home.svg";
import search from "../assets/images/button-icons/search.svg";
import profile from "../assets/images/button-icons/profile.svg";
import config from "./config.json";
import "./Header.css";

function Header({ onLoginClick, onRegisterClick, userId, sortKey }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 992); // Set initial mobile state
  const [userProfile, setUserProfile] = useState({}); // Default to an empty object
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const [isAdmin, setIsAdmin] = useState(false); // New state to check if user is admin

  useEffect(() => {
    if (userId && sortKey) {
      // Fetch profile data from API
      const fetchProfile = async () => {
        if (!userId || !sortKey) {
          console.error("Header: UserId or SortKey is missing.");
          return;
        }

        const url = `${
          config.apiBaseUrl
        }/fetch-profile?UserId=${userId}&SortKey=${encodeURIComponent(
          sortKey
        )}`;
        console.log("Constructed URL:", url);

        try {
          const response = await fetch(url);

          if (!response.ok) throw new Error("Failed to fetch profile data.");

          const data = await response.json();
          console.log("fetchProfile: Fetched data:", data);

          setUserProfile(data);
          setIsLoggedIn(true);

          // Check if the user is an admin
          setIsAdmin(data.city === "admin");
        } catch (err) {
          console.error("Header: Error fetching data:", err.message);
          setUserProfile({});
          setIsLoggedIn(false);
          setIsAdmin(false); // Default to non-admin on error
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

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Navbar bg="white" expand="lg" className="navbar" sticky="top">
        <Navbar.Brand href={"/"}>
          <img src={Logo} alt="Rate Your Roommate" className="navbar-logo" />
        </Navbar.Brand>

        {isAdmin && (
          <Nav className="ms-auto">
            <Navbar.Brand href="/admin">
              <img src={home} alt="home-icon" className="navbar-admin" />
            </Navbar.Brand>
            <Navbar.Brand href="/search">
              <img src={search} alt="search-icon" className="navbar-admin" />
            </Navbar.Brand>
          </Nav>
        )}

        {!isAdmin && (
          <>
            {!isLoggedIn && isMobile && (
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
            )}
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto d-flex">
                {!isLoggedIn && (
                  <>
                    <button
                      className="nav-btn primary-btn"
                      onClick={onLoginClick}
                    >
                      Login
                    </button>
                    <button
                      className="nav-btn secondary-btn"
                      onClick={onRegisterClick}
                    >
                      Register
                    </button>
                  </>
                )}
                {isLoggedIn && !isMobile && (
                  <>
                    <Navbar.Brand href="/home">
                      <img src={home} alt="home-icon" className="navbar-home" />
                    </Navbar.Brand>
                    <Navbar.Brand href="/search">
                      <img
                        src={search}
                        alt="search-icon"
                        className="navbar-search"
                      />
                    </Navbar.Brand>
                    <Navbar.Brand href="/profile">
                      <img
                        src={profile}
                        alt="profile-icon"
                        className="navbar-profile"
                      />
                    </Navbar.Brand>
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
          </>
        )}
      </Navbar>

      {/* Sticky bottom navigation bar for mobile screens */}
      {!isAdmin && isLoggedIn && isMobile && (
        <div className="bottom-navbar d-block d-lg-none">
          <Navbar bg="white" className="bottom-navbar-content">
            <Nav className="w-100 d-flex justify-content-between">
              <Navbar.Brand href="/home">
                <img src={home} alt="home-icon" className="navbar-home" />
              </Navbar.Brand>
              <Navbar.Brand href="/search">
                <img src={search} alt="search-icon" className="navbar-search" />
              </Navbar.Brand>
              <Navbar.Brand href="/profile">
                <img
                  src={profile}
                  alt="profile-icon"
                  className="navbar-profile"
                />
              </Navbar.Brand>
            </Nav>
          </Navbar>
        </div>
      )}
    </>
  );
}

export default Header;
