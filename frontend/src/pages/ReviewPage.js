import React from "react";
import profile4 from "../assets/images/profile-pics/profile4.jpg";
import heart2 from '../assets/images/button-icons/heart2.svg'; 
import heart2filled from '../assets/images/button-icons/heart2-filled.svg'; 

import "./ReviewPage.css";

const ReviewPage = () => {
    return (
      <div className="review-content">
        <div className="review-profile-section">
          <div className="review-profile-card">
            <div className="review-profile-info">
              <div className="review-profile-name">John Fitzgerald</div>
              <div className="review-profile-occupation">
                Software Engineer
              </div>
              <div className="review-profile-description">
                I own a lot of cats
              </div>
              <div className="selected-preferences">
                
              </div>
              <div className="review-profile-score"><span className="highlight4">4.5/5</span> Overall Score</div>
            </div>
            <div className="profile-favorite-icon">
            <img
                src={heart2}
                alt="heart2"
                className="heart-icon"
            />
            </div>
            <div className="image-location-container">
                <div className="image-container">
                    <img
                        src={profile4} // Use the imported image
                        alt="John Fitzgerald"
                        className="review-profile-image"
                    />
                </div>
                <p className="review-profile-location">Calgary, AB</p>
            </div>
          </div>
        </div>

        <div className="review-section">
            <div className="review-card">
                <div className="review-info">
                    <div className="review-score">
                        ★★★★☆
                    </div>
                    <div className="review-title">
                        Too many cats
                    </div>
                    <div className="review-description">
                        cat hair everywhere :(
                    </div>
                    <div className="review-username">
                        Anonymous
                    </div>
                    <div className="review-description">
                        Sept 27, 2024
                    </div>
                </div>
            </div>  

            <div className="review-card">
                <div className="review-info">
                    <div className="review-score">
                        ★★★★☆
                    </div>
                    <div className="review-title">
                        Good roommate
                    </div>
                    <div className="review-description">
                        <br/>
                    </div>
                    <div className="review-username">
                        Anonymous
                    </div>
                    <div className="review-description">
                        Sept 27, 2024
                    </div>
                </div>
            </div>  

        </div>
    </div>
    );
};
  
export default ReviewPage;
