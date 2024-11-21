import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { userList, reviewsData, calculateAverageRating, generateStarRating } from "../data/TestUserData";
import heart2 from "../assets/images/button-icons/heart2.svg";
import heart2filled from "../assets/images/button-icons/heart2-filled.svg";
import './ReviewPage.css';

const ReviewPage = () => {
    const { userId } = useParams(); // Extract the user ID from the URL
    const user = userList.find((u) => u.id === userId); // Find the matching user
    const userReviews = reviewsData.filter(review => review.userId === userId); // Filter reviews by userId

    // Calculate the average rating dynamically based on reviews
    const averageRating = calculateAverageRating(userId);

    // Scroll to the top when the page is rendered
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []); // Empty dependency array ensures it runs only once when the component is mounted

    if (!user) {
        return <h2>User not found!</h2>;
    }

    return (
        <div className="review-content">
            <div className="review-profile-section">
                <div className="review-profile-card">
                    <div className="review-profile-info">
                        <div className="review-profile-name">{user.name}</div>
                        <div className="review-profile-occupation">
                            {user.occupation}
                        </div>
                        <div className="review-profile-description">
                            {user.description}
                        </div>
                        <div className="review-profile-score">
                            <span className="highlight4">{averageRating}/5</span> Rating
                        </div>
                    </div>
                    <div className="profile-favorite-icon">
                        <img
                            src={heart2}
                            alt="heart2"
                            className="heart-icon"
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
                    userReviews.map(review => (
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

export default ReviewPage;
