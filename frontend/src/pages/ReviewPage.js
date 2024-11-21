import React, { useState, useEffect } from "react";
import { Container, Nav } from "react-bootstrap";
import "./ReviewPage.css"; // Add CSS styles separately
import axios from "axios";

function ReviewPage() {
    const [profile, setProfile] = useState(null); // State for profile data
    const [reviews, setRatings] = useState([]);  // State for reviews
    const [loading, setLoading] = useState(true); // State for loading status

    // Fetch profile and reviews data from the server when the component mounts.
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data } = await axios.get("/api/profile");   // replace with actual api endpoints
                setProfile(data);
            } catch (error) {
                console.log("Error fetching profile data: ", error);
            }
        };

        const fetchRatings = async () => {
            try {
                const { data } = await axios.get("/api/ratings");   // replace with actual api endpoints
                setRatings(data);
            } catch (error) {
                console.log("Error fetching reviews data: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
        fetchRatings();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

  return (
    <div className="review-page">
      {/* Header */}
      <header className="header">
        <div className="icons">
          <i className="notification-icon">🔔</i>
          <i className="search-icon">🔍</i>
          <i className="heart-icon">❤️</i>
          <i className="profile-icon">👤</i>
        </div>
      </header>

      {/* Main Profile Section */}
      <section className="profile-section">
        <div className="profile-header">
          <img
            src="/path-to-image.jpg"
            alt="User"
            className="profile-image"
          />
          <div className="profile-info">
            {/* These are placeholders for now, but should be replaced with things from the api calls
            so instead of "John Fitzgerald, it'll be something like "profile.name" to access the profiles name */}
            <h1>John Fitzgerald</h1>
            <p>Software Engineer</p>
            <p>I own a lot of cats</p>
            <div className="tags">
              <span className="tag pet-owner">Pet Owner</span>
              <span className="tag night-owl">Night Owl</span>
            </div>
            <p className="location">Calgary, AB</p>
          </div>
          <div className="rating">
            <h2 id="profile-rating">3.5/5</h2>
            <p id="overall-score">Overall Score</p>
            <button className="rate-button">Rate</button>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      {/* The data will be input from the database into this page... */}
      <section className="reviews-section">
        <div className="review">
          <div className="review-header">
            <span className="stars">⭐⭐⭐✰✰</span>
            <h3>Too many cats</h3>
          </div>
          <p>cat hair everywhere :(</p>
          <div className="review-footer">
            <span>Anonymous - Sept 27, 2024</span>
            <div className="helpful">
              <span>👍 2 people found this helpful</span>
              <span>👎</span>
            </div>
          </div>
        </div>

        <div className="review">
          <div className="review-header">
            <span className="stars">⭐⭐⭐⭐✰</span>
            <h3>Good roommate</h3>
          </div>
          <p>Anonymous - Sept 27, 2024</p>
          <div className="helpful">
            <span>👍</span>
            <span>👎</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ReviewPage;
