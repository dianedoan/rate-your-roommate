import React from 'react';
import AboutContent from '../components/AboutContent';
import './About.css'

function About() {
    return (
    <div>
      <section className="about-container">
        <div className="about-main">
            <h1 className="about-title">About us</h1>
        </div>
      </section>
      <AboutContent />
 </div>
    );
  }
  
  export default About;