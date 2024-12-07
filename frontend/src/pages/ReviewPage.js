import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
<<<<<<< HEAD
import { userList, reviewsData } from "../data/userData";
=======
>>>>>>> aws
import { Badge } from 'react-bootstrap';
import config from "../components/config.json";
import './ReviewPage.css';

const ReviewPage = () => {
<<<<<<< HEAD
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
=======
    const { recipientId } = useParams(); // Fetch recipientId from URL parameters
    const navigate = useNavigate();

    // State variables
    const [reviewProfile, setReviewProfile] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch profile and reviews data from the API
        const fetchReviewData = async () => {
            console.log("Fetching profile and reviews for recipientId:", recipientId);

            const url = `${config.apiBaseUrl}/get-user-reviews?RecipientId=${recipientId}`;

            try {
                const response = await fetch(url);

                if (response.status === 404) {
                    throw new Error("User review page not found."); // Handle 404 explicitly
                }

                if (!response.ok) throw new Error("Failed to fetch review data.");

                const data = await response.json();
                console.log("Fetched data:", data);

                setReviewProfile(data.user);
                setReviews(data.reviews);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching review data:", err.message);
                if (err.message === "User review page not found.") {
                    setError("User review page not found.");
                } else {
                    setError("Failed to fetch review data. Please try again later.");
                }
                setLoading(false);
            }
        };
        
        fetchReviewData();
    }, [recipientId]);
>>>>>>> aws

    // Scroll to the top when the page is rendered
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Categorize preferences for styling
    const getPreferenceCategoryClass = (pref) => {
        if (['Age 18-24', 'Age 25-34', 'Age 35-44'].includes(pref)) return 'age-related';
        if (['Early Riser', 'Late Sleeper', 'Snores'].includes(pref)) return 'sleep-related';
        if (['Pet Owner', 'No Pets', 'Allergic to Pets'].includes(pref)) return 'pet-related';
        if (['Clean & Tidy', 'Messy'].includes(pref)) return 'cleanliness-related';
        if (['Organized', 'Unorganized'].includes(pref)) return 'organize-related';
        if (['Likes Socializing', 'Prefers Quiet Spaces'].includes(pref)) return 'social-related';
        if (['Homebody', 'Goes Out Often', 'Travels Often', 'Works from Home'].includes(pref)) return 'lifestyle-related';
        if (['Smoker Friendly', 'Non-Smoker'].includes(pref)) return 'smoking-related';
        if (['Vegetarian', 'Vegan', 'Pescatarian', 'Non-Vegetarian'].includes(pref)) return 'diet-related';
        if (['Bookworm', 'Gamer', 'Fitness Enthusiast'].includes(pref)) return 'hobby-related';
        return '';
    };

    // Calculate average user rating
    const calculateAverageRating = () => {
        if (reviews.length === 0) return null;
    
        const totalScore = reviews.reduce((sum, review) => {
            const score = parseFloat(review.Score); // Convert Score to a number
            return sum + (isNaN(score) ? 0 : score);
        }, 0);
    
        const average = totalScore / reviews.length
        return average.toFixed(1); // Round to 1 decimal place
    };
    
    const averageRating = calculateAverageRating();

    // Generate star ratings
    const generateStarRating = (score) => {
        const filledStars = '★'.repeat(Math.floor(score));
        const halfStar = score % 1 >= 0.5 ? '½' : '';
        return filledStars + halfStar;
    };

    if (loading) {
        return (
            <div className="general-content">
                <h2>Loading...</h2>
            </div>
        );
    }

<<<<<<< HEAD
    // Render preferences from the user object
    const preferences = user.preferences || [];
=======
    if (error) {
        if (error === "User review page not found.") {
            return (
                <div className="general-content">
                    <h2>Page Not Found!</h2>
                    <h3>The user review page you are trying to access does not exist.</h3>
                </div>
            );
        }

        else {
            return (
                <div className="general-content">
                    <h3>Error: {error}</h3>
                </div>
            );
        }
    }
>>>>>>> aws

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
<<<<<<< HEAD
                    <div className="review-profile-info">
                        <div className="name-heart-container">
                            <div className="review-profile-name">{user.firstName} {user.lastName}</div>
                            <div className="profile-favorite-icon">
                                <img
                                    // Toggle heart icon based on the user's liked profiles
                                    src={likedProfiles.includes(user.username) ? heart2filled : heart2}
                                    alt="heart icon"
                                    className="review-heart-icon"
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent any other actions when clicking the heart
                                        toggleLike(user.username); // Toggle like on click
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
=======
                    <div className="profile-container">
                        <div className="profile-info">

                            <div className="review-profile-name">{reviewProfile.FirstName} {reviewProfile.LastName}</div>
                            <div className="review-profile-occupation">{reviewProfile.Occupation}</div>
                            <div className="review-profile-description">
                                {reviewProfile.AboutMe || "No description provided."}
                            </div>
                            <div className="review-preferences-section">
                                {reviewProfile.Preferences?.map((pref) => (
                                    <Badge
                                        key={pref}
                                        className={`profile-preference-tag ${getPreferenceCategoryClass(pref)}`}
                                    >
                                        {pref}
                                    </Badge>
                                ))}
                            </div>
                            <div className="review-profile-score">
                                <span className="highlight4">
                                    {averageRating !== null ? `${averageRating}/5 ` : "N/A "}
                                </span> 
                                Rating
                                <button
                                    className="rate-btn primary-btn"
                                    onClick={() => navigate(`/create-review/${recipientId}`)}
>>>>>>> aws
                                >
                                    Rate
                                </button>
                            </div>
                        </div>
<<<<<<< HEAD
                    </div>
                    <div className="image-location-container">
                        <div className="image-container">
                            <img
                                src={user.image}
                                alt={user.username}
=======
                        <div className="image-location-container">
                            <img
                                src={reviewProfile.ProfilePicture || "https://res.cloudinary.com/djx2y175z/image/upload/v1733203679/profile0_mcl0ts.png"}
                                alt={`${reviewProfile.username || "User"}'s profile`}
>>>>>>> aws
                                className="review-profile-image"
                            />
                            <p className="review-profile-location">{reviewProfile.City}, {reviewProfile.State}</p>
                        </div>
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
                {reviews.length > 0 ? (
                    [...reviews].reverse().map((review, index) => (
                        <div key={index} className="review-card">
                            <div className="review-info">
                                <div className="review-score">
                                    <span className="highlight5">{review.Score}/5 </span>
                                    <span className="highlight5">{generateStarRating(review.Score)}</span>
                                </div>
                                <div className="review-description">
                                    {review.ReviewText}
                                </div>

                                {review.YesNoAnswers && (
                                    <div className="review-questions">
                                        {Object.entries(review.YesNoAnswers).map(([questionKey, answerObj], index) => {
                                            const questionMapping = {
                                                space_respect: "Was this roommate respectful of your space?",
                                                punctuality: "Was this roommate punctual with paying their living fees?",
                                                roommates_again: "Would you be roommates again?",
                                            };

                                            const questionText = questionMapping[questionKey] || questionKey;

                                            return (
                                                <div key={index} className="review-question-answer">
                                                    <strong>{questionText}</strong>: {answerObj || "Not answered"}
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                                <div className="review-date">
                                    {review.Timestamp ? new Date(review.Timestamp * 1000).toLocaleDateString() : "Date not available"}
                                </div>

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
