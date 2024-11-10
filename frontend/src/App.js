// App.js
import React, {useState, useEffect}from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import About from "./pages/About";
import TermsConditions from "./pages/TermsConditions";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginModal from './components/LoginModal'
import RegisterModal from './components/RegisterModal'
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  // State to control the visibility of the login and register modals
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  // Functions to toggle log in/register modal
  const handleLoginClick = () => setShowLogin(true);
  const handleRegisterClick = () => setShowRegister(true);
  const handleCloseLoginModal = () => setShowLogin(false);
  const handleCloseRegisterModal = () => setShowRegister(false);

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
      <Footer />
      {showLogin && <LoginModal onClose={handleCloseLoginModal} />}
      {showRegister && <RegisterModal onClose={handleCloseRegisterModal} />}
    </Router>
  );
}

export default App;
