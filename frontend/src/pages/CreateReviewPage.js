import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import star from "../assets/images/button-icons/star.svg";
import starfilled from "../assets/images/button-icons/star-filled.svg";
import config from "../components/config.json";
import './CreateReviewPage.css';

const CreateReviewPage = ({ userId, sortKey, userCity }) => {
    const { recipientId } = useParams();
    const navigate = useNavigate();

    const [reviewProfile, setReviewProfile] = useState(null);
    const [ratings, setRatings] = useState({
        cleanliness: 0,
        communication: 0,
        timeliness: 0,
        noiseLevel: 0,
        etiquette: 0,
    });
    const [yesNoQuestions, setYesNoQuestions] = useState({
        space_respect: "",
        punctuality: "",
        roommates_again: "",
    });
    const [openEnded, setOpenEnded] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch recipient profile from the API
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
                console.log("Fetched user data:", data.user);

                setReviewProfile(data.user);
                console.log("Fetched first name:", reviewProfile.FirstName);
                console.log("Fetched last name:", reviewProfile.LastName);
                console.log("Fetched user occupation:", reviewProfile.Occupation);
                console.log("Fetched user city:", reviewProfile.City);
                console.log("Fetched user state:", reviewProfile.State);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching review data:", err.message);
                setLoading(false);
            }
        };
        
        fetchReviewData();
    }, [recipientId]);


    // Scroll to the top when the page is rendered
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const reviewData = {
            reviewerId: userId,
            recipientId,
            score: ((ratings.cleanliness +
                ratings.communication +
                ratings.timeliness +
                ratings.noiseLevel +
                ratings.etiquette) / 5).toFixed(1),
            reviewText: openEnded,
            yesNoAnswers: yesNoQuestions,
            ratings,
        };

        console.log('Submitting Review Data:', reviewData);

        try {
            setLoading(true);
            const response = await fetch(`${config.apiBaseUrl}/write-review?UserId=${userId}&SortKey=${encodeURIComponent(sortKey)}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(reviewData),
            });

            const result = await response.json();

            if (response.ok) {
                navigate(`/reviews/${recipientId}`);
            } else {
                setError(result.message || 'Failed to submit review.');
            }
        } catch (err) {
            setError('An error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

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
        const allRatingsAnswered = Object.values(ratings).every((rating) => rating > 0);
        const allYesNoAnswered = Object.values(yesNoQuestions).every((answer) => answer !== '');

        if (!allRatingsAnswered) {
            setError('Please provide a rating for all categories.');
            return false;
        }

        if (!allYesNoAnswered) {
            setError('Please answer all yes/no questions.');
            return false;
        }

        setError(''); 
        return true;
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

    if (!userId) {
        return (
            <div className="general-content">
                <h2>Not Logged In</h2>
                <h3>Please log in to access this page.</h3>
            </div>
        );
    }

    if (userCity === "admin") {
        return (
          <div className="general-content">
            <h2>Create Review Unavailable</h2>
            <h3>Creating reviews are not available for admin accounts.</h3>
          </div>
        );
    }

    return (
        <div className="create-review-content">
            <div className="create-review-header">
                {reviewProfile ? (
                    <>
                        <div className="create-review-name">Rate: {reviewProfile.FirstName} {reviewProfile.LastName}</div>
                        <div className="occupation-location-container">
                            <div className="create-review-occupation">{reviewProfile.Occupation}</div>
                            <div className="create-review-location">{reviewProfile.City}, {reviewProfile.State}</div>
                        </div>
                    </>
                ) : (
                    <h3>Loading...</h3>
                )}
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
                        id: 'space_respect',
                        question: 'Was this roommate respectful of your space?',
                    }, {
                        id: 'punctuality',
                        question: 'Was this roommate punctual with paying their living fees?',
                    }, {
                        id: 'roommates_again',
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

                    {error && <div className="error-message">{error}</div>} 

                    <div className="create-review-button-container">
                        <button type="submit" className="primary-btn submit-review-btn" disabled={loading}>
                            {loading ? 'Submitting...' : 'Submit Review'}
                        </button>
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