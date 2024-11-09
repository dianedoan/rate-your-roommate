import React from 'react';
import './MainSection.css';

function MainSection({onLoginClick, onRegisterClick}){
  return (
    <section className="main-section">
      <div className="top-content">
        <h1>Rate Your <span className="highlight">Roommate</span></h1>
        <div className="button-container">
          <button className="login-button" onClick={onLoginClick}>Login</button>
          <button className="register-button" onClick={onRegisterClick}>Register</button>
        </div>
      </div>
    </section>
  );
}

export default MainSection;
