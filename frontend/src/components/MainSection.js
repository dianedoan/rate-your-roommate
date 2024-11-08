import React from 'react';
import './MainSection.css';

function MainSection() {
  return (
    <section className="main-section">
      <div className="top-content">
        <h1>Rate Your <span className="highlight">Roommate</span></h1>
        <div className="button-container">
          <button className="login-button">Login</button>
          <button className="register-button">Register</button>
        </div>
      </div>
    </section>
  );
}

export default MainSection;
