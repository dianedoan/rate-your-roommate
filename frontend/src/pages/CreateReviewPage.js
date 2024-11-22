import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { userList, reviewsData } from "../data/userData";
import './CreateReviewPage.css';

const CreateReviewPage = () => {
    const { userId } = useParams(); // Get user ID from URL
    const user = userList.find((u) => u.id === userId); // Find the matching user
    const navigate = useNavigate();

    // State to manage form inputs
    const [ratings, setRatings] = useState({
        cleanliness: 0,
        communication: 0,
        timeliness: 0,
        noiseLevel: 0,
        etiquette: 0,
    });

    const [yesNoQuestions, setYesNoQuestions] = useState({
        respectful: 'Yes',
        wouldRecommend: 'Yes',
        goodExperience: 'Yes',
    });

    const [openEnded, setOpenEnded] = useState('');
    const [isAnonymous, setIsAnonymous] = useState(false); // State to track anonymous submission

    // Handle rating change
    const handleRatingChange = (category, value) => {
        setRatings((prevRatings) => ({
            ...prevRatings,
            [category]: parseInt(value),
        }));
    };

    // Handle Y/N question change
    const handleYesNoChange = (question, value) => {
        setYesNoQuestions((prevQuestions) => ({
            ...prevQuestions,
            [question]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Create the new review object
        const newReview = {
            id: `review-${Date.now()}`, // Unique ID for the review
            userId,
            username: isAnonymous ? "Anonymous" : "Current User", // Check if user chose to submit anonymously
            ratings,
            score: parseFloat(
                (
                    (ratings.cleanliness +
                        ratings.communication +
                        ratings.timeliness +
                        ratings.noiseLevel +
                        ratings.etiquette) / 5
                ).toFixed(1)
            ), // Calculate the average score rounded to 1 decimal place
            title: "User Feedback", // You can customize this or add a title input field
            description: openEnded,
            date: new Date().toLocaleDateString(),
        };

        // Add the new review to the beginning of the reviewsData array
        reviewsData.unshift(newReview);

        console.log("New Review Submitted:", newReview);

        // Redirect back to the user review page
        navigate(`/reviews/${userId}`);
    };

    return (
        <div className="create-review-content">
            <div className="create-review-header">
                <div className="create-review-name">Rate: {user.name}</div>
                <div className="occupation-location-container">
                    <div className="create-review-occupation">{user.occupation}</div>
                    <div className="create-review-location">{user.city}, {user.state}</div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="review-form">
                <div className="questions-section">
                    {['cleanliness', 'communication', 'timeliness', 'noiseLevel', 'etiquette'].map((category) => (
                        <div key={category} className="question-card rating-category">
                            <label htmlFor={category}>{category.charAt(0).toUpperCase() + category.slice(1)}:</label>
                            <select
                                id={category}
                                value={ratings[category]}
                                onChange={(e) => handleRatingChange(category, e.target.value)}
                            >
                                <option value="0">Select</option>
                                {[1, 2, 3, 4, 5].map((rating) => (
                                    <option key={rating} value={rating}>
                                        {rating}
                                    </option>
                                ))}
                            </select>
                        </div>
                    ))}

                    {[{
                        id: 'respectful',
                        question: 'Was this roommate respectful of your space?',
                    }, {
                        id: 'punctualFees',
                        question: 'Was this roommate punctual with paying their living fees?',
                    }, {
                        id: 'roommatesAgain',
                        question: 'Would you be roommates again?',
                    }].map(({ id, question }) => (
                        <div key={id} className="question-card yes-no-question">
                            <label>{question}</label>
                            <div>
                                <label>
                                    <input
                                        type="radio"
                                        name={id}
                                        value="Yes"
                                        checked={yesNoQuestions[id] === 'Yes'}
                                        onChange={(e) => handleYesNoChange(id, e.target.value)}
                                    />
                                    Yes
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name={id}
                                        value="No"
                                        checked={yesNoQuestions[id] === 'No'}
                                        onChange={(e) => handleYesNoChange(id, e.target.value)}
                                    />
                                    No
                                </label>
                            </div>
                        </div>
                    ))}

                    <div className="question-card open-ended-section">
                        <label htmlFor="openEnded">What do you want other users to know about this roommate?</label>
                        <textarea
                            id="openEnded"
                            value={openEnded}
                            onChange={(e) => setOpenEnded(e.target.value)}
                            rows="5"
                            placeholder="Write your comments here..."
                        />
                    </div>

                    <div className="question-card anonymous-toggle">
                        <label>
                            <input
                                type="checkbox"
                                checked={isAnonymous}
                                onChange={() => setIsAnonymous((prev) => !prev)}
                            />
                            Submit as Anonymous
                        </label>
                    </div>

                    <div className="button-container">
                        <button type="submit" className="primary-btn create-review-btn">Submit Review</button>
                        <button
                            type="button"
                            className="secondary-btn create-review-btn"
                            onClick={() => navigate(`/reviews/${userId}`)} // Navigate back to the user's review page
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CreateReviewPage;
