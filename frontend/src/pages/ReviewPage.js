import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { userList, getInitialLikedProfiles, getTopRatedList } from "../data/TestUserData";
import heart2 from "../assets/images/button-icons/heart2.svg";
import heart2filled from "../assets/images/button-icons/heart2-filled.svg";
import './ReviewPage.css';

const ReviewPage = () => {
    const { userId } = useParams(); // Extract the user ID from the URL
    const user = userList.find((u) => u.id === userId); // Find the matching user
    
    // Scroll to the top when the page is rendered
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); // Empty dependency array ensures it runs only once when the component is mounted

    if (!user) {
        return <h2>User not found!</h2>;
    }
    return (
        <div className="review-content">
        <div className="review-profile-section">
          <div className="review-profile-card">
            <div className="review-profile-info">
              <div className="review-profile-name">{user.name}</div>
              <div className="review-profile-occupation">
                {user.occupation}
              </div>
              <div className="review-profile-description">
                {user.description}
              </div>
              <div className="selected-preferences">
                
              </div>
              <div className="review-profile-score"><span className="highlight4">{user.rating}/5</span> Rating</div>
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
                        src={user.image}
                        alt={user.name}
                        className="review-profile-image"
                    />
                </div>
                <p className="review-profile-location">{user.city}, {user.state}</p>
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
