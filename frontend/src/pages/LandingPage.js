import React from 'react';
import Header from '../components/Header';
import MainSection from '../components/MainSection';
import Features from '../components/Features';
import Footer from '../components/Footer';
import '../assets/styles/global.css';  // Import global styles

function LandingPage() {
  return (
    <div>    
      <Header />
      <MainSection />
      <Features />
      <Footer />
    </div>
  );
}

export default LandingPage;
