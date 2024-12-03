import React from 'react';
import MainSection from '../components/MainSection';
import Features from '../components/Features';

function LandingPage({ onLoginClick, onRegisterClick, userId }) {
  return (
    <div>    
      <MainSection 
        onLoginClick={onLoginClick} 
        onRegisterClick={onRegisterClick} 
        userId={userId} 
      />
      <Features />
    </div>
  );
}

export default LandingPage;
