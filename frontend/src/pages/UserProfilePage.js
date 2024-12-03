import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Badge } from "react-bootstrap";
import config from "../components/config.json";
import "./UserProfilePage.css";

const UserProfilePage = ({ userId, sortKey, onLogout }) => {
  console.log("UserProfilePage: Received userId and sortKey:", userId, sortKey);
  const navigate = useNavigate();

  // State variables
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch profile data from API
  const fetchProfile = async () => {
    console.log(
      "fetchProfile triggered with userId:",
      userId,
      "and sortKey:",
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
      const response = await fetch(
        `${
          config.apiBaseUrl
        }/fetch-profile?UserId=${userId}&SortKey=${encodeURIComponent(sortKey)}`
      );
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

  useEffect(() => {
    if (userId && sortKey) {
      console.log(
        "useEffect triggered with userId and sortKey:",
        userId,
        sortKey
      );
      fetchProfile();
    } else {
      console.log("useEffect skipped: userId or sortKey is null.");
    }
  }, [userId, sortKey]);

  // Handle logout
  const handleLogout = () => {
    const confirmation = window.confirm("Are you sure you want to logout?");
    if (confirmation) {
      console.log(userProfile?.username, "logged out.");
      //   navigate("/");
      onLogout(); // Call the logout handler from App.js
    }
  };

  // Handle deactivate account
  const handleDeactivateAccount = () => {
    const confirmation = window.confirm(
      "Are you sure you want to deactivate your account? This action is permanent and cannot be undone."
    );

    if (confirmation) {
      console.log("Account deactivated for user:", userProfile?.username);
      alert("Your account has been deactivated.");
      //   navigate("/");
      onLogout(); // Reset the user state and navigate
    }
  };

  // Helper function to categorize preferences
  const getPreferenceCategoryClass = (pref) => {
    const categories = {
      "Age 18-24": "age-related",
      "Age 25-34": "age-related",
      "Age 35-44": "age-related",
      "Early Riser": "sleep-related",
      "Late Sleeper": "sleep-related",
      Snores: "sleep-related",
      "Pet Owner": "pet-related",
      "No Pets": "pet-related",
      "Allergic to Pets": "pet-related",
      "Clean & Tidy": "cleanliness-related",
      Messy: "cleanliness-related",
      Organized: "organize-related",
      Unorganized: "organize-related",
      "Likes Socializing": "social-related",
      "Prefers Quiet Spaces": "social-related",
      Homebody: "lifestyle-related",
      "Goes Out Often": "lifestyle-related",
      "Travels Often": "lifestyle-related",
      "Works from Home": "lifestyle-related",
      "Smoker Friendly": "smoking-related",
      "Non-Smoker": "smoking-related",
      Vegetarian: "diet-related",
      Vegan: "diet-related",
      Pescatarian: "diet-related",
      "Non-Vegetarian": "diet-related",
      Bookworm: "hobby-related",
      "Fitness Enthusiast": "hobby-related",
      Gamer: "hobby-related",
    };

    return categories[pref] || "";
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const preferences = userProfile?.ProfileData?.preferences || [];
  const reviews = userProfile?.reviews || [];

  return (
    <div className="user-profile-content">
      <div className="user-profile-header">
        <div className="user-profile-image">
          <img
            src={userProfile?.image || "default-profile.png"}
            alt={`${userProfile?.firstName || "User"}'s profile`}
            className="user-profile-image"
          />
        </div>
        <div className="user-profile-info">
          <div className="user-profile-name">
            {userProfile?.firstName} {userProfile?.lastName}
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
              <div key={review.id} className="past-review-info line-separator">
                <div className="past-review-score">
                  <span className="highlight5">{review.score}/5 </span>
                  <span className="highlight5">
                    {generateStarRating(review.score)}
                  </span>
                </div>
                <div className="past-review-title">{review.title}</div>
                <div className="past-review-description">
                  {review.description}
                </div>
              </div>
            ))
          ) : (
            <h5>No reviews yet.</h5>
          )}
        </div>
      </div>
      <div className="profile-buttons-container">
        <button className="profile-btn logout-btn" onClick={handleLogout}>
          Logout
        </button>
        <button
          className="profile-btn deactivate-btn"
          onClick={handleDeactivateAccount}
        >
          Deactivate Account
        </button>
      </div>
    </div>
  );
};

export default UserProfilePage;
