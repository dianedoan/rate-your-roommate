import React from 'react';
import '../assets/styles/global.css';  

function TermContent() {
    return (
        <div className="terms-content">
            <h5>Acceptance of Terms</h5>
            <p className="content">
                By signing up for or using the <span className="highlight5">Rate Your Roommate</span> platform, you confirm that you have read, understood, and agree to these terms. 
                If you do not agree, you may not access or use our services.
            </p>
            <h5>Eligibility</h5>
            <p className="content">
                Users must be at least 18 years of age to create an account or use our services. By signing up, you represent and warrant that you meet this age requirement.
            </p>
            <h5>Reviews and Ratings</h5>
            <p className="content">
                All ratings and reviews must be truthful, constructive, and free of offensive language or discriminatory remarks. 
                Users are prohibited from posting false reviews, manipulating ratings, or engaging in activities that compromise the integrity of the platform. 
                <span className="highlight5"> Rate Your Roommate</span> reserves the right to remove any reviews or ratings that violate these guidelines.
            </p>
            <h5>Account Termination</h5>
            <p className="content">
                <span className="highlight5">Rate Your Roommate</span> reserves the right to terminate or suspend accounts that violate these terms, post harmful content, or engage in fraudulent or illegal activities.
            </p>
            <h5>Modifications to Terms</h5>
            <p className="content">
            We may update these terms and conditions from time to time. Any changes will be communicated, and continued use of the platform signifies acceptance of the revised terms.
            </p>
        </div>
    )
}

export default TermContent