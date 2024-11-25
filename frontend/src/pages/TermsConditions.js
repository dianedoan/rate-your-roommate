import React from 'react';
import TermsContent from '../components/TermsContent';
import './TermsConditions.css';  

function TermsConditions() {
    return (
    <div>
      <section className="terms-container">
        <div className="terms-main">
            <h1 className="terms-title">Terms & Conditions</h1>
        </div>
      </section>
      <TermsContent />
 </div>
    );
  }
  
  export default TermsConditions;