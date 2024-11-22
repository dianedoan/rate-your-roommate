import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Badge } from 'react-bootstrap';
import { userList, reviewsData, generateStarRating } from "../data/userData";
import './UserProfilePage.css';

const UserProfilePage = () => {
    // Manually set logged in user
    const loggedInUser = userList.find(user => user.username === 'sallysmith');
    const navigate = useNavigate();

    // Filter reviews made by the current user
    const userReviews = reviewsData.filter(review => review.authorId === loggedInUser.id);

    // Handle logout
    const handleLogout = () => {
        const confirmation = window.confirm(
            "Are you sure you want to logout?"
        );
        if (confirmation) {
            console.log(loggedInUser.name, "logged out.");
            navigate('/');
        } else {
            console.log("Logout canceled.");
        }
    };

    // Helper function to categorize preferences
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

    // Render preferences from the user object
    const preferences = loggedInUser.preferences || [];

    return (
        <div className="user-profile-content">
            <div className="user-profile-header">
                <div className="user-profile-image">
                    <img
                        src={loggedInUser.image}
                        alt={`${loggedInUser.firstName} ${loggedInUser.lastName}'s profile`}
                        className="user-profile-image"
                    />
                </div>
                <div className="user-profile-info">
                    <div className="user-profile-name">{loggedInUser.firstName} {loggedInUser.lastName}</div>
                    <div className="user-profile-occupation">{loggedInUser.occupation}</div>
                    <div className="user-profile-location">{loggedInUser.city}, {loggedInUser.state}</div>
                    <Link
                        to={`/edit-profile`}
                        className="edit-profile-btn"
                    >
                        Edit Profile
                    </Link>
                </div>
            </div>
            <div className="user-profile-cards-section">
                <div className="user-profile-card">
                    <div className="user-profile-about-me">About Me</div>
                    <div className="user-profile-description">{loggedInUser.description || 'No description provided.'}</div>
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
                    {userReviews.length > 0 ? (
                        userReviews.map((review) => (
                            <div key={review.id} className="past-review-info line-separator">
                                <div className="past-review-score">
                                    <span className="highlight5">{review.score}/5 </span>
                                    <span className="highlight5">{generateStarRating(review.score)}</span>
                                </div>
                                <div className="past-review-title">{review.title}</div>
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
                                <div className="past-review-username">{review.username}</div>
                                <div className="past-review-date">{review.date}</div>
                            </div>
                        ))
                    ) : (
                        <h5>No reviews yet.</h5>
                    )}
                </div>
            </div>
            <div className="profile-buttons-container">
                <button className="profile-btn logout-btn" onClick={handleLogout}>Logout</button>
                <button className="profile-btn deactivate-btn" onClick={handleDeactivateAccount}>Deactivate Account</button>
            </div>
        </div>
    );
};

export default UserProfilePage;
