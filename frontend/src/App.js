import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import About from "./pages/About";
import TermsConditions from "./pages/TermsConditions";
import HomePage from "./pages/HomePage";
import ReviewPage from "./pages/ReviewPage";
import CreateReviewPage from "./pages/CreateReviewPage";
import SearchPage from "./pages/SearchPage";
import MessagesPage from "./pages/MessagesPage";
import SavedRoommatesPage from "./pages/SavedRoommatesPage";
import UserProfilePage from "./pages/UserProfilePage";
import EditProfilePage from "./pages/EditProfilePage";
import AdminPage from "./pages/AdminPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginModal from "./components/LoginModal";
import RegisterModal from "./components/RegisterModal";
import ForgotPasswordModal from "./components/ForgotPasswordModal";
import SetupProfileModal from "./components/SetupProfileModal";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/styles/global.css";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showSetupProfile, setShowSetupProfile] = useState(false);
  const [userId, setUserId] = useState(null);
  const [sortKey, setSortKey] = useState(null);
  // const [isSuccess, setIsSuccess] = useState(null);
  // const [securityQuestion, setSecurityQuestion] = useState("");
  const [showPasswordResetForm, setShowPasswordResetForm] = useState(false);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const storedSortKey = localStorage.getItem("sortKey");
    if (storedUserId && storedSortKey) {
      setUserId(storedUserId);
      setSortKey(storedSortKey);
    }
  }, []);

  // Functions to toggle login/register modal
  const handleLoginClick = () => setShowLogin(true);
  const handleRegisterClick = () => setShowRegister(true);
  const handleRegisterToLoginClick = () => {
    setShowRegister(false);
    setShowLogin(true);
  };

  const handleForgotPasswordClick = () => {
    setIsSuccess(null);
    setShowForgotPassword(true);
    setShowLogin(false);
  };

  const handleCloseLoginModal = () => setShowLogin(false);
  const handleCloseRegisterModal = () => setShowRegister(false);
  const handleCloseForgotPasswordModal = () => {
    setShowForgotPassword(false);
    setIsSuccess(null);
    setShowPasswordResetForm(false);
  };

  const handleCloseSetupProfileModal = () => setShowSetupProfile(false);

  const handleSuccessfulLogin = (response) => {
    try {
      // Log the response to debug its structure
      console.log("Login response:", response);

      // Ensure the body is parsed
      const parsedBody = response.body
        ? JSON.parse(response.body) // Parse stringified body
        : response;

      // Extract UserId and SortKey from the parsed body
      const { UserId, SortKey } = parsedBody;

      // Validate the extracted values
      if (!UserId || !SortKey) {
        throw new Error("Invalid login response format.");
      }

      // Set the values in state
      setUserId(UserId);
      setSortKey(SortKey);
      console.log("App.js: Set UserId and SortKey:", UserId, SortKey);

      // Persist in localStorage
      localStorage.setItem("userId", UserId);
      localStorage.setItem("sortKey", SortKey);

      // Navigate to the home page
      setShowLogin(false);
      window.location.href = "/home";
    } catch (error) {
      console.error("Login response error:", error.message);
      alert("Failed to log in. Please try again.");
    }
  };

  const handleSuccessRegister = (response) => {
    try {
      // Ensure the body is parsed
      const parsedBody = response.body
        ? JSON.parse(response.body) // Parse stringified body
        : response;

      // Extract UserId and SortKey from the parsed body
      const { UserId, SortKey } = parsedBody;

      // Validate the extracted values
      if (!UserId || !SortKey) {
        throw new Error("Invalid registration response format.");
      }

      // Set the values in state
      setUserId(UserId);
      setSortKey(SortKey);
      console.log(
        "App.js: Set UserId and SortKey after registration:",
        UserId,
        SortKey
      );

      // Persist in localStorage
      localStorage.setItem("userId", UserId);
      localStorage.setItem("sortKey", SortKey);

      // Open the setup profile modal
      setShowSetupProfile(true);
    } catch (error) {
      console.error("Registration response error:", error.message);
      alert("Failed to register. Please try again.");
    }
  };

  const handleLogout = () => {
    const confirmation = window.confirm("Are you sure you want to logout?");
    if (confirmation) {
      // Clear state
      setUserId(null);
      setSortKey(null);

      // Remove from localStorage
      localStorage.removeItem("userId");
      localStorage.removeItem("sortKey");

      // Navigate to the landing page
      window.location.href = "/";
    }
  };

  const handleGuestLogin = () => {
    // Navigate to the landing page
    window.location.href = "/home";
  }
  
  return (
    <Router>
      <Header
        onLoginClick={handleLoginClick}
        onRegisterClick={handleRegisterClick}
        userId={userId}
        sortKey={sortKey}
      />
      <Routes>
        <Route
          path="/"
          element={
            <LandingPage
              onLoginClick={handleLoginClick}
              onRegisterClick={handleRegisterClick}
              userId={userId}
            />
          }
        />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/terms" element={<TermsConditions />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/reviews/:recipientId" element={<ReviewPage />} />
        <Route path="/create-review/:recipientId" element={<CreateReviewPage userId={userId} sortKey={sortKey}/>} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/saved" element={<SavedRoommatesPage />} />
        <Route
          path="/profile"
          element={<UserProfilePage userId={userId} sortKey={sortKey} onLogoutClick={handleLogout}/>}
        />
        <Route
          path="/edit-profile"
          element={<EditProfilePage userId={userId} sortKey={sortKey} />}
        />
      </Routes>
      <Footer onForgotPasswordClick={handleForgotPasswordClick} />
      {showLogin && (
        <LoginModal
          onClose={handleCloseLoginModal}
          onLoginSuccess={handleSuccessfulLogin}
          onForgotPasswordClick={handleForgotPasswordClick}
          onGuestLogin={handleGuestLogin}
        />
      )}
      {showRegister && (
        <RegisterModal
          onClose={handleCloseRegisterModal}
          onRegisterSuccess={handleSuccessRegister}
          onLoginClick={handleRegisterToLoginClick}
        />
      )}
      {showForgotPassword && (
        <ForgotPasswordModal onClose={handleCloseForgotPasswordModal} />
      )}
      {showSetupProfile && (
        <SetupProfileModal
          show={showSetupProfile}
          onClose={handleCloseSetupProfileModal}
          userId={userId}
          sortKey={sortKey}
          onLoginSuccess={handleSuccessfulLogin}
        />
      )}
    </Router>
  );
}

export default App;

