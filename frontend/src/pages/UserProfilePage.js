import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Badge } from "react-bootstrap";
import config from "../components/config.json";
import "./UserProfilePage.css";

const UserProfilePage = ({ userId, sortKey, onLogoutClick }) => {
  console.log("UserProfilePage: Received userId and sortKey:", userId, sortKey);

  // State variables
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch profile data from API
  const fetchProfile = async () => {
    console.log(
      "useEffect triggered with userId and sortKey:",
      userId,
      sortKey
    );

    if (!userId || !sortKey) {
      setError("UserId or SortKey is missing.");
      return;
    }

    const url = `${
      config.apiBaseUrl
    }/fetch-profile?UserId=${userId}&SortKey=${encodeURIComponent(sortKey)}`;
    console.log("Constructed URL:", url);

    try {
      const response = await fetch(url);

      if (!response.ok) throw new Error("Failed to fetch profile data.");

      const data = await response.json();
      console.log("fetchProfile: Fetched data:", data);
      setUserProfile(data);
      setLoading(false);
    } catch (err) {
      console.error("fetchProfile: Error fetching data:", err.message);
      setError("Failed to fetch profile data.");
      setLoading(false);
    }
  };

  // Fetch user reviews
  const fetchReviews = async () => {
    const url = `${config.apiBaseUrl}/get-my-reviews?ReviewerId=${userId}`;
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch reviews.");
      const data = await response.json();
      setReviews(data.reviews || []); // Assuming the API returns an object with a "reviews" array
    } catch (err) {
      console.error("Error fetching reviews:", err.message);
      setError("Failed to fetch reviews.");
    }
  };

  useEffect(() => {
    if (userId && sortKey) {
      console.log(
        "useEffect triggered with userId and sortKey:",
        userId,
        sortKey
      );
      fetchProfile();
      fetchReviews();
    } else {
      console.log("useEffect skipped: userId or sortKey is null.");
    }
  }, [userId, sortKey]);

  // Function to generate the star rating based on score
  const generateStarRating = (score) => {
    const filledStars = "★".repeat(Math.floor(score));
    const halfStar = score % 1 >= 0.5 ? "½" : ""; // Check if score has a .5 and add "½" if true
    return filledStars + halfStar;
  };

  const preferences = userProfile?.ProfileData?.preferences || [];

  // Function to categorize preferences
  const getPreferenceCategoryClass = (pref) => {
    if (["Age 18-24", "Age 25-34", "Age 35-44"].includes(pref)) {
      return "age-related";
    }
    if (["Early Riser", "Late Sleeper", "Snores"].includes(pref)) {
      return "sleep-related";
    }
    if (["Pet Owner", "No Pets", "Allergic to Pets"].includes(pref)) {
      return "pet-related";
    }
    if (["Clean & Tidy", "Messy"].includes(pref)) {
      return "cleanliness-related";
    }
    if (["Organized", "Unorganized"].includes(pref)) {
      return "organize-related";
    }
    if (["Likes Socializing", "Prefers Quiet Spaces"].includes(pref)) {
      return "social-related";
    }
    if (
      [
        "Homebody",
        "Goes Out Often",
        "Travels Often",
        "Works from Home",
      ].includes(pref)
    ) {
      return "lifestyle-related";
    }
    if (["Smoker Friendly", "Non-Smoker"].includes(pref)) {
      return "smoking-related";
    }
    if (
      ["Vegetarian", "Vegan", "Pescatarian", "Non-Vegetarian"].includes(pref)
    ) {
      return "diet-related";
    }
    if (["Bookworm", "Gamer", "Fitness Enthusiast"].includes(pref)) {
      return "hobby-related";
    }
    return "";
  };

  const reviews = userProfile?.reviews || [];

  if (!userId) {
    return (
      <div className="general-content">
        <h2>Not Logged In</h2>
        <h3>Please log in to access this page.</h3>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="general-content">
        <h2>Loading...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="general-content">
        <h3>Error: {error}</h3>
      </div>
    );
  }

  return (
    <div className="user-profile-content">
      <div className="user-profile-header">
        <div className="user-profile-image">
          <img
            src={
              userProfile?.profile_picture ||
              "https://res.cloudinary.com/djx2y175z/image/upload/v1733203679/profile0_mcl0ts.png"
            }
            alt={`${userProfile?.username || "User"}'s profile`}
            className="user-profile-image"
          />
        </div>
        <div className="user-profile-info">
          <div className="user-profile-name">
            {userProfile?.first_name} {userProfile?.last_name}
          </div>
          <div className="user-profile-occupation">
            {userProfile?.occupation || "N/A"}
          </div>
          <div className="user-profile-location">
            {userProfile?.city}, {userProfile?.state}
          </div>
          <Link to="/edit-profile" className="edit-profile-btn">
            Edit Profile
          </Link>
        </div>
      </div>
      <div className="user-profile-cards-section">
        <div className="user-profile-card">
          <div className="user-profile-about-me">About Me</div>
          <div className="user-profile-description">
            {userProfile?.ProfileData?.aboutMe || "No description provided."}
          </div>
        </div>
        <div className="user-profile-card">
          <div className="user-profile-preferences">
            Preferences & Lifestyle
          </div>
          <div className="preferences-section">
            {preferences.length > 0 ? (
              preferences.map((pref) => (
                <Badge
                  key={pref}
                  className={`profile-preference-tag ${getPreferenceCategoryClass(
                    pref
                  )}`}
                >
                  {pref}
                </Badge>
              ))
            ) : (
              <h5>No preferences added.</h5>
            )}
          </div>
        </div>
        <div className="user-profile-card">
          <div className="user-profile-reviews">Past Reviews</div>
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div
                key={review["DataType#Timestamp"]}
                className="past-review-info line-separator"
              >
                <div className="past-review-score">
                  <span className="highlight5">{review.score}/5 </span>
                  <span className="highlight5">
                    {generateStarRating(review.score)}
                  </span>
                </div>
                <div className="past-review-description">
                  {review.ReviewText}
                </div>
                {review.yesNoAnswers && (
                  <div className="past-review-questions">
                    {Object.entries(review.YesNoAnswers).map(
                      ([question, answer], index) => (
                        <div
                          key={index}
                          className="past-review-question-answer"
                        >
                          <strong>{question.replace(/_/g, " ")}:</strong>{" "}
                          {answer}
                        </div>
                      )
                    )}
                  </div>
                )}
                <div className="past-review-date">{review.date}</div>
              </div>
            ))
          ) : (
            <h5>No reviews yet.</h5>
          )}
        </div>
      </div>
      <div className="profile-buttons-container">
        <button className="profile-btn" onClick={onLogoutClick}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfilePage;
