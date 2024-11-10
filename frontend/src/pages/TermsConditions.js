import React from 'react';
import './TermsConditions.css';  


function TermsConditions() {
    return (
      <section className="terms-conditions-container">
        <div className="terms-condition-main">
            <h1 className="terms-title">Terms & Conditions</h1>
        </div>
        <div className="content-container">
            <p className="terms-content">
              THESE TERMS OF USE CONTAIN AN ARBITRATION CLAUSE AND A CLASS ACTION WAIVER CLAUSE.
              BY USING THIS SITE, YOU ARE ACCEPTING THE TERMS OF USE AND, WHILE YOU MAY STILL PURSUE
              CLAIMS AGAINST US, WITH A FEW EXCEPTIONS (FOR EXAMPLE, IF YOU SUBMIT A VALID ARBITRATION/CLASS 
              ACTIONS WAIVER OPT-OUT FORM AS DESCRIBED IN SECTION 15 BELOW), YOU ARE AGREEING THAT YOU MUST PURSUE
              YOUR CLAIMS IN A BINDING ARBITRATION PROCEEDING (AND NOT IN A COURT) AND ONLY ON AN INDIVIDUAL
              (AND NOT A CLASS ACTION) BASIS.
            </p>
            </div>
      </section>
    );
  }
  
  export default TermsConditions;