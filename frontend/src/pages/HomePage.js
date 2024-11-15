import React from "react";
import { Card } from "react-bootstrap";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="homepage-content">
      <div className="top-rated-section">
        <h2>
          Top-Rated <span className="highlight">Roommates</span>
        </h2>
        <div className="top-rated-card">
          <div className="profile-image-container">
            <img
              src="/path/to/alice-profile-image.jpg"
              alt="Alice Wang"
              className="profile-image"
            />
          </div>
          <div className="profile-info">
            <div className="profile-info">
              <div className="profile-name">Alice Wang</div>
              <div className="profile-description">
                Athlete
                <br />I love skating and sleeping
              </div>
              <div className="profile-score">4.5/5 Overall Score</div>
            </div>
          </div>
          <div className="location-favorite-container">
            <p className="location">Calgary, AB</p>
            <div className="favorite-icon">&#9825;</div>
          </div>
        </div>
      </div>

      <div className="explore-section">
        <h2>
          Explore <span className="highlight">Roommates</span>
        </h2>
        <div className="explore-cards">
          <Card className="explore-card">
            <div className="profile-image-container">
              <img
                src="/path/to/dave-profile-image.jpg"
                alt="Dave Jones"
                className="profile-image"
              />
            </div>
            <div className="profile-info">
              <div className="profile-name">Dave Jones</div>
              <div className="profile-description">
                Neurosurgeon
                <br />I have a passion for biking
              </div>
              <div className="profile-score">★★★★☆</div>
            </div>
            <div className="location-favorite-container">
              <p className="location">Airdrie, AB</p>
              <div className="favorite-icon">&#9825;</div>
            </div>
          </Card>

          <Card className="explore-card">
            <div className="profile-image-container">
              <img
                src="/path/to/dave-profile-image.jpg"
                alt="Dave Jones"
                className="profile-image"
              />
            </div>
            <div className="profile-info">
              <div className="profile-name">Bob Brown</div>
              <div className="profile-description">
              Student
                <br />NEED a roommate ASAP
              </div>
              <div className="profile-score">★★☆☆☆</div>
            </div>
            <div className="location-favorite-container">
              <p className="location">Calgary, AB</p>
              <div className="favorite-icon">&#9825;</div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
