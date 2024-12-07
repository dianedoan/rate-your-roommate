import React from 'react';
import TermsContent from '../components/TermsContent';
import Picture1 from '../assets/images/Picture1.svg';
import './TermsConditions.css';  

function TermsConditions() {
    return (
    <div>
      <section className="terms-container">
        <div className="terms-main">
            <h1 className="terms-title">Terms & Conditions</h1>
        </div>
        <img src={Picture1} alt="Terms Image" className="terms-image" />
      </section>
      <TermsContent />
 </div>
    );
  }
  
  export default TermsConditions;