import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { userList, reviewsData } from "../data/userData";
import { Badge } from 'react-bootstrap';
import heart2 from "../assets/images/button-icons/heart2.svg";
import heart2filled from "../assets/images/button-icons/heart2-filled.svg";
import './ReviewPage.css';

const ReviewPage = () => {
    // Manually set logged in user
    const loggedInUser = userList.find(user => user.username === 'sallysmith');

    const { userId } = useParams(); // Extract the user ID from the URL
    const user = userList.find((u) => u.id === userId); // Find the matching user
    const userReviews = reviewsData.filter(review => review.userId === userId); // Filter reviews by userId
    const [likedProfiles, setLikedProfiles] = useState(loggedInUser.likedProfiles);

    // Use navigate for redirection
    const navigate = useNavigate();

    // Calculate average rating for a user based on their reviews
    const calculateAverageRating = (userId) => {
        // Filter reviews by the user
        const userReviews = reviewsData.filter(review => review.userId === userId);
        
        // Calculate the sum of the scores and the number of reviews
        const totalScore = userReviews.reduce((acc, review) => acc + parseFloat(review.score), 0);
        const averageRating = totalScore / userReviews.length;

        // Round to 1 decimal place
        return averageRating ? Math.round(averageRating * 10) / 10 : 0;
    };

    // Calculate average rating based on reviews
    const averageRating = userReviews.length > 0 ? calculateAverageRating(userId) : null; // If no reviews, set averageRating to null
    
    // Function to generate the star rating based on score
    const generateStarRating = (score) => {
        const filledStars = '★'.repeat(Math.floor(score));
        const halfStar = score % 1 >= 0.5 ? '½' : ''; // Check if score has a .5 and add "½" if true
        return filledStars + halfStar;
    };

    // Function to toggle the liked status of a profile (removing or re-adding profiles)
    const toggleLike = (userName) => {
        setLikedProfiles((prevLikes) => {
            const updatedLikes = [...prevLikes]; // Create a copy of the liked profiles array

            if (updatedLikes.includes(userName)) {
                // If the user is already liked, remove them
                const index = updatedLikes.indexOf(userName);
                updatedLikes.splice(index, 1);
            } else {
                // If the user is not liked, add them
                updatedLikes.push(userName);
            }

            console.log("Liked Profiles:", updatedLikes);
            return updatedLikes;
        });
    };

    // Scroll to the top when the page is rendered
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []); // Ensures it runs only once when the component is mounted

    if (!user) {
        return (
            <div className="general-content">
                <h2>Page Not Found!</h2>
                <h3>The user review page you are trying to access does not exist.</h3>
            </div>
        );
    }

    // Render preferences from the user object
    const preferences = user.preferences || [];

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

    return (
        <div className="review-content">
            <div className="review-profile-section">
                <div className="review-profile-card">
                    <div className="review-profile-info">
                        <div className="name-heart-container">
                            <div className="review-profile-name">{user.name}</div>
                            <div className="profile-favorite-icon">
                                <img
                                    // Toggle heart icon based on the user's liked profiles
                                    src={likedProfiles.includes(user.name) ? heart2filled : heart2}
                                    alt="heart icon"
                                    className="review-heart-icon"
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent any other actions when clicking the heart
                                        toggleLike(user.name); // Toggle like on click
                                    }}
                                />
                            </div>
                        </div>
                        <div className="review-profile-occupation">{user.occupation}</div>
                        <div className="review-profile-description">{user.description}</div>
                        <div className="review-preferences-section">
                            {preferences.map((pref) => (
                                <Badge
                                    key={pref}
                                    className={`profile-preference-tag ${getPreferenceCategoryClass(pref)}`}
                                >
                                    {pref}
                                </Badge>
                            ))}
                        </div>
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
                    <div className="review-profile-score">
                        <span className="highlight4">
                            {averageRating !== null ? `${averageRating}/5 ` : "N/A "}
                        </span> 
                        Rating
                        <button
                            className="rate-btn primary-btn"
                            onClick={() => navigate(`/create-review/${userId}`)} // Redirect to CreateReviewPage
                        >
                            Rate
                        </button>
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
                                    <span className="highlight5">{generateStarRating(review.score)}</span>
                                </div>
                                <div className="review-title">{review.title}</div>
                                <div className="review-description">{review.description}</div>

                                {review.yesNoAnswers && (
                                    <div className="review-questions">
                                        {review.yesNoAnswers.map((item, index) => (
                                            <div key={index} className="review-question-answer">
                                                <strong>{item.question}</strong> {item.answer}
                                            </div>
                                        ))}
                                    </div>
                                )}
                                
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

export default ReviewPage;
