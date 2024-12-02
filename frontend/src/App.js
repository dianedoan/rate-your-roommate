import React, { useState } from "react";
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
  const [userId, setUserId] = useState(null); // New state to store the userId
  const [isSuccess, setIsSuccess] = useState(null);
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [showPasswordResetForm, setShowPasswordResetForm] = useState(false);

  // Functions to toggle login/register modal
  const handleLoginClick = () => setShowLogin(true);
  const handleRegisterClick = () => setShowRegister(true);
  const handleRegisterToLoginClick = () => {
    setShowRegister(false); // Close RegisterModal
    setShowLogin(true); // Open LoginModal
  };

  const handleForgotPasswordClick = () => {
    setIsSuccess(null);
    setShowForgotPassword(true);
    setShowLogin(false); // Close LoginModal
  };

  const handleCloseLoginModal = () => setShowLogin(false);
  const handleCloseRegisterModal = () => setShowRegister(false);

  const handleCloseForgotPasswordModal = () => {
    setShowForgotPassword(false);
    setIsSuccess(null);
    setShowPasswordResetForm(false);
  };

  // Handle successful registration
  const handleSuccessfulRegistration = (newUserId) => {
    setUserId(newUserId); // Save the userId
    setShowRegister(false); // Close the RegisterModal
    setShowSetupProfile(true); // Show the SetupProfileModal
  };

  const handleCloseSetupProfileModal = () => setShowSetupProfile(false);

  const handleSuccessfulLogin = () => {
    setShowLogin(false);
    window.location.href = "/home";
  };

  return (
    <Router>
      <Header
        onLoginClick={handleLoginClick}
        onRegisterClick={handleRegisterClick}
      />
      <Routes>
        <Route
          path="/"
          element={
            <LandingPage
              onLoginClick={handleLoginClick}
              onRegisterClick={handleRegisterClick}
            />
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/terms" element={<TermsConditions />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/reviews/:userId" element={<ReviewPage />} />
        <Route path="/create-review/:userId" element={<CreateReviewPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/saved" element={<SavedRoommatesPage />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/edit-profile" element={<EditProfilePage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
      <Footer onForgotPasswordClick={handleForgotPasswordClick} />

      {showLogin && (
        <LoginModal
          onClose={handleCloseLoginModal}
          onLoginSuccess={handleSuccessfulLogin}
          onForgotPasswordClick={handleForgotPasswordClick}
        />
      )}
      {showRegister && (
        <RegisterModal
          onClose={handleCloseRegisterModal}
          onRegisterSuccess={handleSuccessfulRegistration} // Pass the handler
          onLoginClick={handleRegisterToLoginClick}
        />
      )}
      {showForgotPassword && (
        <ForgotPasswordModal
          onClose={handleCloseForgotPasswordModal}
          onSubmit={handleSubmitForgotPassword}
          isSuccess={isSuccess}
          securityQuestion={securityQuestion}
          showPasswordResetForm={showPasswordResetForm}
          onSecuritySubmit={handleSecuritySubmit}
          onPasswordReset={handlePasswordReset}
          onForgotPasswordClick={handleForgotPasswordClick}
        />
      )}
      {showSetupProfile && (
        <SetupProfileModal
          show={showSetupProfile}
          onClose={handleCloseSetupProfileModal}
          userId={userId} // Pass the userId to SetupProfileModal
          onLoginSuccess={handleSuccessfulLogin}
        />
      )}
    </Router>
  );
}

export default App;
