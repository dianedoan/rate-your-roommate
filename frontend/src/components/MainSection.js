import React from 'react';
import './MainSection.css';

function MainSection() {
  return (
    <section className="main-section">
      <h1>Rate Your <span className="highlight">Roommate</span></h1>
      <button className="login-button mr-5">Login</button>
      <button className="register-button">Register</button>
    </section>
  );
}

export default MainSection;
