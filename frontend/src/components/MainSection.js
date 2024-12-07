import React from 'react';
import Picture2 from '../assets/images/Picture2.svg';
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
        <img src={Picture2} alt="Landing Image" className="landing-image" />
      </div>
    </section>
  );
}

export default MainSection;
