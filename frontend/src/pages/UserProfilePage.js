import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Badge } from "react-bootstrap";
import config from "../components/config.json";
import "./UserProfilePage.css";

const UserProfilePage = ({ userId, sortKey, onLogoutClick }) => {
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

        const url = `${config.apiBaseUrl}/fetch-profile?UserId=${userId}&SortKey=${encodeURIComponent(sortKey)}`;
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

    // Handle deactivate account
    const handleDeactivateAccount = () => {
        const confirmation = window.confirm(
            "Are you sure you want to deactivate your account? This action is permanent and cannot be undone."
        );

        if (confirmation) {
            console.log("Account deactivated for user:", loggedInUser.name);
            alert("Your account has been deactivated.");
            navigate('/');
        } else {
            console.log("Account deactivation canceled.");
        }
    };

    // Function to generate the star rating based on score
    const generateStarRating = (score) => {
        const filledStars = '★'.repeat(Math.floor(score));
        const halfStar = score % 1 >= 0.5 ? '½' : ''; // Check if score has a .5 and add "½" if true
        return filledStars + halfStar;
    };

    const preferences = userProfile?.ProfileData?.preferences || [];
    
    // Function to categorize preferences
    const getPreferenceCategoryClass = (pref) => {
        if (['Age 18-24', 'Age 25-34', 'Age 35-44'].includes(pref)) {
            return 'age-related';
        }
        if (['Early Riser', 'Late Sleeper', 'Snores'].includes(pref)) {
            return 'sleep-related';
        }
        if (['Pet Owner', 'No Pets', 'Allergic to Pets'].includes(pref)) {
            return 'pet-related';
        }
        if (['Clean & Tidy', 'Messy'].includes(pref)) {
            return 'cleanliness-related';
        }
        if (['Organized', 'Unorganized'].includes(pref)) {
            return 'organize-related';
        }
        if (['Likes Socializing', 'Prefers Quiet Spaces'].includes(pref)) {
            return 'social-related';
        }
        if (['Homebody', 'Goes Out Often', 'Travels Often', 'Works from Home'].includes(pref)) {
            return 'lifestyle-related';
        }
        if (['Smoker Friendly', 'Non-Smoker'].includes(pref)) {
            return 'smoking-related';
        }
        if (['Vegetarian', 'Vegan', 'Pescatarian', 'Non-Vegetarian'].includes(pref)) {
            return 'diet-related';
        }
        if (['Bookworm', 'Gamer', 'Fitness Enthusiast'].includes(pref)) {
            return 'hobby-related';
        }
        return '';
    };

    const reviews = userProfile?.reviews || [];
    
    return (
        <div className="user-profile-content">
            <div className="user-profile-header">
                <div className="user-profile-image">
                    <img
                        src={userProfile?.profile_picture || "https://res.cloudinary.com/djx2y175z/image/upload/v1733203679/profile0_mcl0ts.png"}
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
                    <div className="user-profile-preferences">Preferences & Lifestyle</div>
                    <div className="preferences-section">
                        {preferences.length > 0 ? (
                            preferences.map((pref) => (
                                <Badge
                                    key={pref}
                                    className={`profile-preference-tag ${getPreferenceCategoryClass(pref)}`}
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
                                    <span className="highlight5">{generateStarRating(review.score)}</span>
                                </div>
                                <div className="past-review-description">{review.description}</div>
                                {review.yesNoAnswers && (
                                    <div className="past-review-questions">
                                        {review.yesNoAnswers.map((item, index) => (
                                            <div key={index} className="past-review-question-answer">
                                                <strong>{item.question}</strong> {item.answer}
                                            </div>
                                        ))}
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
                <button className="profile-btn logout-btn" onClick={onLogoutClick}>Logout</button>
                <button className="profile-btn deactivate-btn" onClick={handleDeactivateAccount}>Deactivate Account</button>
            </div>
        </div>
    );
};

export default UserProfilePage;
