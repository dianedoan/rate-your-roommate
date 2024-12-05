import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import star from "../assets/images/button-icons/star.svg";
import starfilled from "../assets/images/button-icons/star-filled.svg";
import config from "../components/config.json";
import './CreateReviewPage.css';

const CreateReviewPage = ({ userId, sortKey }) => {
    const { recipientId } = useParams();
    const navigate = useNavigate();

    const [ratings, setRatings] = useState({
        cleanliness: 0,
        communication: 0,
        timeliness: 0,
        noiseLevel: 0,
        etiquette: 0,
    });
    const [yesNoQuestions, setYesNoQuestions] = useState({
        respectful: "",
        punctualFees: "",
        roommatesAgain: "",
    });
    const [openEnded, setOpenEnded] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);




    const handleRatingChange = (category, value) => {
        setRatings((prevRatings) => ({
            ...prevRatings,
            [category]: value,
        }));
    };

    const handleYesNoChange = (question, value) => {
        setYesNoQuestions((prevQuestions) => ({
            ...prevQuestions,
            [question]: value,
        }));
    };

    const validateForm = () => {
        // Check all ratings
        const allRatingsAnswered = Object.values(ratings).every((rating) => rating > 0);

        // Check all yes/no questions
        const allYesNoAnswered = Object.values(yesNoQuestions).every((answer) => answer !== '');

        if (!allRatingsAnswered) {
            setError('Please provide a rating for all categories.');
            return false;
        }

        if (!allYesNoAnswered) {
            setError('Please answer all yes/no questions.');
            return false;
        }

        setError(''); // Clear error if validation passes
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const newReview = {
            reviewId: `review-${Date.now()}`,
            userId,
            authorId: user.username,
            ratings,
            score: parseFloat(
                (
                    (ratings.cleanliness +
                        ratings.communication +
                        ratings.timeliness +
                        ratings.noiseLevel +
                        ratings.etiquette) / 5
                ).toFixed(1)
            ),
            description: openEnded,
            yesNoAnswers: [
                {
                    question: 'Was this roommate respectful of your space?',
                    answer: yesNoQuestions.respectful
                },
                {
                    question: 'Was this roommate punctual with paying their living fees?',
                    answer: yesNoQuestions.punctualFees
                },
                {
                    question: 'Would you be roommates again?',
                    answer: yesNoQuestions.roommatesAgain
                }
            ],
            date: new Date().toLocaleDateString(),
        };

        reviewsData.unshift(newReview);
        console.log("New Review Submitted:", newReview);
        navigate(`/reviews/${userId}`);
    };

    const renderStars = (category, labelBefore, labelAfter) => {
        const rating = ratings[category];
        const stars = [];

        for (let i = 1; i <= 5; i++) {
            const starIcon = i <= rating ? starfilled : star;
            stars.push(
                <div key={i} className="star-container">
                    <img
                        src={starIcon}
                        alt={`star ${i}`}
                        className="star-icon"
                        onClick={() => handleRatingChange(category, i)}
                    />
                    <div className="star-number">{i}</div>
                </div>
            );
        }

        return (
            <div className="star-rating">
                <div className="star-label">{labelBefore}</div>
                <div className="stars-container">{stars}</div>
                <div className="star-label">{labelAfter}</div>
            </div>
        );
    };

    // if (loading) {
    //     return (
    //         <div className="general-content">
    //             <h2>Loading...</h2>
    //         </div>
    //     );
    // }

    if (!userId) {
        return (
            <div className="general-content">
                <h2>Not Logged In</h2>
                <h3>Please log in to access this page.</h3>
            </div>
        );
    }

    return (
        <div className="create-review-content">
            <div className="create-review-header">
                <div className="create-review-name">Rate: {recipientId.first_name || "Name"} {recipientId.last_name}</div>
                <div className="occupation-location-container">
                    <div className="create-review-occupation">{recipientId.occupation || "Occupation"}</div>
                    <div className="create-review-location">{recipientId.city || "City"}, {recipientId.state || "State"}</div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="review-form">
                <div className="questions-section">
                    {['cleanliness', 'communication', 'timeliness', 'noiseLevel', 'etiquette'].map((category) => {
                        const categoryLabel = 
                            category === 'noiseLevel' ? 'Noise Level' : 
                            category === 'etiquette' ? 'Etiquette & Manners' :
                            category.charAt(0).toUpperCase() + category.slice(1);

                        const labelMapping = {
                            cleanliness: ['Messy', 'Clean'],
                            communication: ['Non-existent', 'Active'],
                            timeliness: ['Late', 'On-time'],
                            noiseLevel: ['Quiet', 'Loud'],
                            etiquette: ['Rude', 'Polite'],
                        };

                        return (
                            <div key={category} className="question-card rating-category">
                                <label className="question-label" htmlFor={categoryLabel}>{categoryLabel}</label>
                                <div className="stars-container">
                                    {renderStars(category, labelMapping[category][0], labelMapping[category][1])}
                                </div>
                            </div>
                        );
                    })}

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
                            <label className="question-label">{question}</label>
                            <div>
                                <label className="radio-label">
                                    <input
                                        type="radio"
                                        name={id}
                                        value="Yes"
                                        checked={yesNoQuestions[id] === 'Yes'}
                                        onChange={(e) => handleYesNoChange(id, e.target.value)}
                                        className="radio-button"
                                    />
                                    Yes
                                </label>
                                <label className="radio-label">
                                    <input
                                        type="radio"
                                        name={id}
                                        value="No"
                                        checked={yesNoQuestions[id] === 'No'}
                                        onChange={(e) => handleYesNoChange(id, e.target.value)}
                                        className="radio-button"
                                    />
                                    No
                                </label>
                                <label className="radio-label">
                                    <input
                                        type="radio"
                                        name={id}
                                        value="Unsure"
                                        checked={yesNoQuestions[id] === 'Unsure'}
                                        onChange={(e) => handleYesNoChange(id, e.target.value)}
                                        className="radio-button"
                                    />
                                    Unsure
                                </label>
                            </div>
                        </div>
                    ))}

                    <div className="question-card open-ended-section">
                        <label className="question-label" htmlFor="openEnded">What do you want other users to know about this roommate?</label>
                        <textarea
                            className="comments-form"
                            value={openEnded}
                            onChange={(e) => setOpenEnded(e.target.value)}
                            rows="5"
                            placeholder="Write your comments here..."
                        />
                    </div>

                    {error && <div className="error-message">{error}</div>} {/* Display error message */}

                    <div className="create-review-button-container">
                        <button type="submit" className="primary-btn submit-review-btn">Submit Review</button>
                        <button
                            type="button"
                            className="secondary-btn submit-review-btn"
                            onClick={() => navigate(`/reviews/${recipientId}`)}
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
