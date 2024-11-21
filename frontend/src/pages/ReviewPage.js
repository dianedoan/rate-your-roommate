import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { userList, userListWithRatings, reviewsData, calculateAverageRating, generateStarRating, getInitialLikedProfiles } from "../data/userData";
import heart2 from "../assets/images/button-icons/heart2.svg";
import heart2filled from "../assets/images/button-icons/heart2-filled.svg";
import { Badge } from 'react-bootstrap'; // Assuming you're using react-bootstrap
import { FaTimes } from 'react-icons/fa'; // For the close button
import './ReviewPage.css';

const ReviewPage = () => {
    const { userId } = useParams(); // Extract the user ID from the URL
    const user = userList.find((u) => u.id === userId); // Find the matching user
    const userReviews = reviewsData.filter(review => review.userId === userId); // Filter reviews by userId

    // Calculate the average rating dynamically based on reviews
    const averageRating = calculateAverageRating(userId);

    // Initialize liked profiles state
    const [likedProfiles, setLikedProfiles] = useState(getInitialLikedProfiles());

    // Function to toggle the liked status of a profile
    const toggleLike = (userName) => {
        setLikedProfiles((prevLikes) => {
            const user = userListWithRatings.find(u => u.name === userName);
            if (!user) return prevLikes;

            const updatedLikes = { ...prevLikes };
            if (updatedLikes[userName]) {
                delete updatedLikes[userName];
            } else {
                updatedLikes[userName] = user;
            }

            console.log("Liked Profiles:", Object.values(updatedLikes));
            return updatedLikes;
        });
    };

    // Scroll to the top when the page is rendered
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []); // Empty dependency array ensures it runs only once when the component is mounted

    // Handle removing selected preferences when clicking the 'X' button
    const handleBadgeClick = (pref) => {
        // Handle preference removal logic here (e.g., update state)
        // For now, assuming you're toggling the list of selected preferences:
        setSelectedPreferences((prev) => prev.filter((p) => p !== pref));
    };

    if (!user) {
        return <h2>User not found!</h2>;
    }

    // Render preferences from the user object
    const preferences = user.preferences || [];

    return (
        <div className="review-content">
            <div className="review-profile-section">
                <div className="review-profile-card">
                    <div className="review-profile-info">
                        <div className="review-profile-name">{user.name}</div>
                        <div className="review-profile-occupation">{user.occupation}</div>
                        <div className="review-profile-description">{user.description}</div>
                        <div className="preferences-section">
                            {preferences.map((pref) => (
                                <Badge
                                    key={pref}
                                    className={`preference-tag profile-preference-tag ${getPreferenceCategoryClass(pref)}`}
                                >
                                    {pref}
                                </Badge>
                            ))}
                        </div>
                        <div className="review-profile-score">
                            <span className="highlight4">{averageRating}/5</span> Rating
                        </div>
                    </div>
                    <div className="profile-favorite-icon">
                        <img
                            src={likedProfiles[user.name] ? heart2filled : heart2}
                            alt="heart icon"
                            className="heart-icon"
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent any other actions when clicking the heart
                                toggleLike(user.name); // Toggle like on click
                            }}
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
                {userReviews.length > 0 ? (
                    userReviews.map((review) => (
                        <div key={review.id} className="review-card">
                            <div className="review-info">
                                <div className="review-score">
                                    <span className="highlight5">{review.score}/5 </span>
                                    <span className="highlight6">{generateStarRating(review.score)}</span>
                                </div>
                                <div className="review-title">{review.title}</div>
                                <div className="review-description">{review.description}</div>
                                <div className="review-username">{review.username}</div>
                                <div className="review-date">{review.date}</div>
                            </div>
                        </div>
                    ))
                ) : (
                    <h2>No reviews yet.</h2>
                )}
            </div>
        </div>
    );
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

export default ReviewPage;
