import React from 'react';
import './TermsConditions.css';  
import TermContent from '../components/TermContent';

function TermsConditions() {
    return (
    <div>
      <section className="terms-conditions-container">
        <div className="terms-condition-main">
            <h1 className="terms-title">Terms & Conditions</h1>
        </div>
      </section>
      <TermContent />
 </div>
    );
  }
  
  export default TermsConditions;