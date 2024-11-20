// App.js
import React, {useState, useEffect}from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import About from "./pages/About";
import TermsConditions from "./pages/TermsConditions";
import HomePage from "./pages/HomePage";
import ReviewPage from "./pages/ReviewPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginModal from './components/LoginModal';
import RegisterModal from './components/RegisterModal';
import ForgotPasswordModal from './components/ForgotPasswordModal';
import SetupProfileModal from './components/SetupProfileModal';
import "bootstrap/dist/css/bootstrap.min.css";
import './assets/styles/global.css';

function App() {
  // State to control the visibility of the login and register modals
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showSetupProfile, setShowSetupProfile] = useState(false);
  const [isSuccess, setIsSuccess] = useState(null); 
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [showPasswordResetForm, setShowPasswordResetForm] = useState(false);

  // Functions to toggle login/register modal
  const handleLoginClick = () => setShowLogin(true);
  const handleRegisterClick = () => setShowRegister(true);
  const handleRegisterToLoginClick = () => {
    setShowRegister(false); // Close RegisterModal
    setShowLogin(true);     // Open LoginModal
  };

  const handleForgotPasswordClick = () => {
    setIsSuccess(null); 
    setShowForgotPassword(true);
    setShowLogin(false); // Close LoginModal
  }

  const handleCloseLoginModal = () => setShowLogin(false);
  const handleCloseRegisterModal = () => setShowRegister(false);
  
  const handleCloseForgotPasswordModal = () => {
    setShowForgotPassword(false);
    setIsSuccess(null);
    setShowPasswordResetForm(false);
  };
  
  // Handle form submit for ForgotPasswordModal
  const handleSubmitForgotPassword = (username, email) => {
    if (username === "user" && email === "user@example.com") {
      setIsSuccess(true);
      setSecurityQuestion("What is your pet's name?");
    } else {
      setIsSuccess(false);
    }
  };

  // Handle form submit for security question in ForgotPasswordModal
  const handleSecuritySubmit = (answer) => {
    if (answer === "Kat") {
      setShowPasswordResetForm(true); // Show password reset form
    } else {
      alert("Incorrect answer. Try again.");
    }
  };

  // Handle form submit for password reset in ForgotPasswordModal
  const handlePasswordReset = (newPassword) => {
    console.log("New Password:", newPassword); // Simulate saving the password
  };

  const handleSuccessfulRegistration = () => {
    setShowRegister(false); 
    setShowSetupProfile(true); 
  };

  const handleCloseSetupProfileModal = () => setShowSetupProfile(false);

  const handleSuccessfulLogin = () => {
    setShowLogin(false);
    window.location.href = '/home';
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
        <Route path="/review" element={<ReviewPage />} />
      </Routes>
      <Footer onForgotPasswordClick={handleForgotPasswordClick}/>
      
      {showLogin && <LoginModal 
        onClose={handleCloseLoginModal} 
        onLoginSuccess={handleSuccessfulLogin} 
        onForgotPasswordClick={handleForgotPasswordClick}
      />}
      {showRegister && <RegisterModal 
        onClose={handleCloseRegisterModal}
        onRegisterSuccess={handleSuccessfulRegistration} 
        onLoginClick={handleRegisterToLoginClick}
      />}
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
      {showSetupProfile && <SetupProfileModal show={showSetupProfile} onClose={handleCloseSetupProfileModal} />}
    </Router>
  );
}

export default App;
