import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { userList, reviewsData } from "../data/userData";
import star2 from "../assets/images/button-icons/star2.svg";
import star2filled from "../assets/images/button-icons/star2-filled.svg";
import './CreateReviewPage.css';

const CreateReviewPage = () => {
    const loggedInUser = userList.find(user => user.username === 'sallysmith');
    const { userId } = useParams();
    const user = userList.find((u) => u.id === userId);
    const navigate = useNavigate();

    const [ratings, setRatings] = useState({
        cleanliness: 0,
        communication: 0,
        timeliness: 0,
        noiseLevel: 0,
        etiquette: 0,
    });

    const [yesNoQuestions, setYesNoQuestions] = useState({
        respectful: '',
        punctualFees: '', 
        roommatesAgain: '',
    });

    const [openEndedTitle, setTitle] = useState('');
    const [openEnded, setOpenEnded] = useState('');
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [error, setError] = useState(''); // State for error messages

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
            username: isAnonymous ? "Anonymous" : user.username,
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
            title: openEndedTitle,
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
            const starIcon = i <= rating ? star2filled : star2;
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

    return (
        <div className="create-review-content">
            <div className="create-review-header">
                <div className="create-review-name">Rate: {user.username}</div>
                <div className="occupation-location-container">
                    <div className="create-review-occupation">{user.occupation}</div>
                    <div className="create-review-location">{user.city}, {user.state}</div>
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
                        <label className="question-label" htmlFor="title">What do you want other users to know about this roommate?</label>
                        <input
                            className="comments-form-title"
                            type="text"
                            id="title"
                            value={openEndedTitle}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter a title..."
                        />

                        <label className="question-label" htmlFor="openEnded"></label>
                        <textarea
                            className="comments-form"
                            value={openEnded}
                            onChange={(e) => setOpenEnded(e.target.value)}
                            rows="5"
                            placeholder="Write your comments here..."
                        />
                    </div>

                    <div className="question-card anonymous-toggle">
                        <label className="anonymous-label">
                            <input
                                className="anonymous-checkbox"
                                type="checkbox"
                                checked={isAnonymous}
                                onChange={() => setIsAnonymous((prev) => !prev)}
                            />
                            Submit as Anonymous?
                        </label>
                    </div>

                    {error && <div className="error-message">{error}</div>} {/* Display error message */}

                    <div className="create-review-button-container">
                        <button type="submit" className="primary-btn submit-review-btn">Submit Review</button>
                        <button
                            type="button"
                            className="secondary-btn submit-review-btn"
                            onClick={() => navigate(`/reviews/${userId}`)}
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
