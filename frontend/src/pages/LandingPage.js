import React, {useState, useEffect}from 'react';
import Header from '../components/Header';
import MainSection from '../components/MainSection';
import Features from '../components/Features';
import Footer from '../components/Footer';
import LoginModal from '../components/LoginModal'
import RegisterModal from '../components/RegisterModal'
import '../assets/styles/global.css';  

function LandingPage (){

  // States to control the visibility of the login and register modals
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    console.log('showLogin state changed:', showLogin);
  }, [showLogin]);  // This will run every time showLogin changes

  // Functions to toggle each modal
  const handleLoginClick = () => {setShowLogin(true);

  }; 
  const handleRegisterClick = () => {setShowRegister(true);

  };  
  const handleCloseLoginModal = () => {
    setShowLogin(false);
  };
  const handleCloseRegisterModal = () => {
    setShowRegister(false);
  };
  return (
    <div>    
      <Header onLoginClick={handleLoginClick} onRegisterClick={handleRegisterClick} />
      <MainSection onLoginClick={handleLoginClick} onRegisterClick={handleRegisterClick} />
      {showLogin && <LoginModal onClose={handleCloseLoginModal} />}
      {showRegister && <RegisterModal onClose={handleCloseRegisterModal} />}
      <Features />
      <Footer />
    </div>
  );
}

export default LandingPage;
