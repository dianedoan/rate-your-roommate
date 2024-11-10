// App.js
import React, {useState, useEffect}from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import About from "./pages/About";
import TermsConditions from "./pages/TermsConditions";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginModal from './components/LoginModal';
import RegisterModal from './components/RegisterModal';
import ForgotPasswordModal from './components/ForgotPasswordModal';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  // State to control the visibility of the login and register modals
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(null); // Track password reset success or failure

  // Functions to toggle log in/register modal
  const handleLoginClick = () => setShowLogin(true);
  const handleRegisterClick = () => setShowRegister(true);
  const handleForgotPasswordClick = () => {
    setIsSuccess(null); // Reset success or failure state
    setShowForgotPassword(true);
  }
  const handleCloseForgotPasswordModal = () => setShowForgotPassword(false);
  const handleCloseLoginModal = () => setShowLogin(false);
  const handleCloseRegisterModal = () => setShowRegister(false);

    // Handle form submit for ForgotPasswordModal
    const handleSubmitForgotPassword = (username, email) => {
      if (email === "user@example.com" && username =="hello") {
        setIsSuccess(true); // Simulate success

      } else {
        setIsSuccess(false); // Simulate failure
      }
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
      </Routes>
      <Footer onForgotPasswordClick={handleForgotPasswordClick}/>
      {showLogin && <LoginModal onClose={handleCloseLoginModal} />}
      {showRegister && <RegisterModal onClose={handleCloseRegisterModal} />}
      {showForgotPassword && (
        <ForgotPasswordModal onClose={handleCloseForgotPasswordModal}
        onSubmit={handleSubmitForgotPassword} 
        isSuccess={isSuccess}  //Pass the password reset success or failure state
         />
         )} 

    </Router>
  );
}

export default App;
