import React from 'react';
import './MainSection.css';

function MainSection({ onLoginClick, onRegisterClick, userId }) {
  return (
    <section className={`main-section ${userId ? "logged-in" : ""}`}>
      <div className="top-content">
        <h1>Rate Your <span className="highlight">Roommate</span></h1>
        {!userId && (
          <div className="button-container">
            <button className="normal-btn primary-btn" onClick={onLoginClick}>Login</button>
            <button className="normal-btn secondary-btn" onClick={onRegisterClick}>Register</button>
          </div>
        )}
      </div>
    </section>
  );
}

export default MainSection;
