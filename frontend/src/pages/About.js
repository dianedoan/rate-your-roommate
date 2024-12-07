import React from 'react';
import AboutContent from '../components/AboutContent';
import Picture3 from '../assets/images/Picture3.svg';
import './About.css'

function About() {
    return (
    <div>
      <section className="about-container">
        <div className="about-main">
            <h1 className="about-title">About us</h1>
        </div>
        <img src={Picture3} alt="About Image" className="about-image" />
      </section>
      <AboutContent />
 </div>
    );
  }
  
  export default About;