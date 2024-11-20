import React from 'react';
import MainSection from '../components/MainSection';
import Features from '../components/Features';

function LandingPage ({ onLoginClick, onRegisterClick }){
  return (
    <div>    
      <MainSection onLoginClick={onLoginClick} onRegisterClick={onRegisterClick} />
      <Features />
    </div>
  );
}

export default LandingPage;
