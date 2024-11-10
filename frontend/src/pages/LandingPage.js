import React from 'react';
import MainSection from '../components/MainSection';
import Features from '../components/Features';
import '../assets/styles/global.css';  

function LandingPage ({ onLoginClick, onRegisterClick }){
  return (
    <div>    
      <MainSection onLoginClick={onLoginClick} onRegisterClick={onRegisterClick} />
      <Features />
    </div>
  );
}

export default LandingPage;
