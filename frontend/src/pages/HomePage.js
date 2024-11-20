import React from "react";
import { Card } from "react-bootstrap";
import profile1 from "../assets/images/profile-pics/profile1.jpg";
import profile2 from "../assets/images/profile-pics/profile2.jpg";
import profile3 from "../assets/images/profile-pics/profile3.jpg";
import heart2 from '../assets/images/button-icons/heart2.svg'; 
import heart2clicked from '../assets/images/button-icons/heart2-clicked.svg'; 


import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="homepage-content">
      <div className="top-rated-section">
        <h2>Top-Rated <span className="highlight2">Roommates</span></h2>
        <div className="top-rated-card">
          <div className="profile-image-container">
            <img
              src={profile1} // Use the imported image
              alt="Alice Wang"
              className="top-rated-profile-image"
            />
          </div>
          <div className="top-rated-profile-info">
            <div className="top-rated-profile-name">Alice Wang</div>
            <div className="top-rated-profile-occupation">
              Athlete
            </div>
            <div className="top-rated-profile-description">
              I love skating and sleeping
            </div>
            <div className="profile-score"><span className="highlight4">4.5/5</span> Overall Score</div>
          </div>
          <div className="location-favorite-container">
            <p className="top-rated-location">Calgary, AB</p>
            <div className="favorite-icon">
              <img
                src={heart2}
                alt="heart2"
                className="heart-icon"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="explore-section">
        <h2>Explore <span className="highlight3">Roommates</span></h2>
        <div className="explore-card">
          <div className="profile-image-container">
            <img
              src={profile2} // Use the imported image
              alt="Dave Jones"
              className="profile-image"
            />
          </div>
          <div className="profile-info">
            <div className="profile-info">
              <div className="profile-name">Dave Jones</div>
              <div className="profile-score">★★★★☆</div>
              <div className="profile-occupation">
                Neurosurgeon
                </div>
              <div className="profile-description">
                I have a passion for biking
              </div>
            </div>
          </div>
          <div className="location-favorite-container">
            <p className="location">Airdrie, AB</p>
            <div className="favorite-icon">
              <img
                src={heart2}
                alt="heart2"
                className="heart-icon"
              />
            </div>
          </div>
        </div>

        <div className="explore-card">
          <div className="profile-image-container">
            <img
              src={profile3} // Use the imported image
              alt="Bob Brown"
              className="profile-image"
            />
          </div>
          <div className="profile-info">
            <div className="profile-info">
              <div className="profile-name">Bob Brown</div>
              <div className="profile-score">★★★★☆</div>
              <div className="profile-occupation">
                Student
              </div>
              <div className="profile-description">
                NEED a roommate ASAP
              </div>
            </div>
          </div>
          <div className="location-favorite-container">
            <p className="location">Calgary, AB</p>
            <div className="favorite-icon">
              <img
                src={heart2}
                alt="heart2"
                className="heart-icon"
              />
            </div>
          </div>
        </div>
          {/* <Card className="explore-card">
            <div className="profile-image-container">
              <img
                src={profile1} // Use the imported image
                alt="Bob Brown"
                className="profile-image"
              />
            </div>
            <div className="profile-info">
              <div className="profile-name">Bob Brown</div>
              <div className="profile-description">
              Student
                <br />NEED a roommate ASAP
              </div>
              <div className="profile-score">★★★★☆☆</div>
            </div>
            <div className="location-favorite-container">
              <p className="location">Calgary, AB</p>
              <div className="favorite-icon">&#9825;</div>
            </div>
          </Card> */}
      </div>
    </div>
  );
};

export default HomePage;
