import { useState, useEffect } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import { Badge } from 'react-bootstrap';
import { userList, reviewsData, generateStarRating } from "../data/userData";
import edit from "../assets/images/button-icons/edit.svg";
import './EditProfilePage.css';

const EditProfilePage = () => {
    // Manually set logged in user
    const loggedInUser = userList.find(user => user.username === 'alicewang');
    const navigate = useNavigate();

    // Filter reviews for the current user
    const userReviews = reviewsData.filter(review => review.userId === loggedInUser.id);

    const preferencesList = [
        'Age 18-24', 'Age 25-34', 'Age 35-44',
        'Early Riser', 'Late Sleeper', 'Snores',
        'Pet Owner', 'No Pets', 'Allergic to Pets',
        'Clean & Tidy', 'Messy', 'Organized', 'Unorganized',
        'Likes Socializing', 'Prefers Quiet Spaces', 'Homebody',
        'Goes Out Often', 'Travels Often', 'Works from Home',
        'Smoker Friendly', 'Non-Smoker',
        'Vegetarian', 'Vegan', 'Pescatarian', 'Non-Vegetarian',
        'Bookworm', 'Fitness Enthusiast', 'Gamer'
    ];

    // State for editing About Me
    const [isEditingAboutMe, setIsEditingAboutMe] = useState(false);
    const [aboutMeText, setAboutMeText] = useState(loggedInUser.description || '');
    const [originalAboutMe, setOriginalAboutMe] = useState(loggedInUser.description || '');
    const [selectedPreferences, setSelectedPreferences] = useState(loggedInUser?.preferences || []);
    const [isEditingPreferences, setIsEditingPreferences] = useState(false);

    // State for editing reviews
    const [isEditingReviews, setIsEditingReviews] = useState(false);
    const [userReviewsState, setUserReviewsState] = useState(userReviews); // Store reviews in state

    // Save changes to About Me
    const handleSaveAboutMe = () => {
        // Update the originalAboutMe state and simulate saving the updated data
        setOriginalAboutMe(aboutMeText);
        loggedInUser.description = aboutMeText; // Example update (update the actual data as needed)
        setIsEditingAboutMe(false);
    };

    // Cancel editing and revert the state
    const handleCancelEdit = () => {
        setAboutMeText(originalAboutMe); // Revert to the original description
        setIsEditingAboutMe(false);
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

    // Handle preference badge click to add or remove preferences
    const handleBadgeClick = (pref) => {
        if (selectedPreferences.includes(pref)) {
            setSelectedPreferences(prev => prev.filter(item => item !== pref)); // Remove preference
        } else {
            setSelectedPreferences(prev => [...prev, pref]); // Add preference
        }
    };

    // Handle the editing mode toggle for preferences
    const handleEditPreferencesClick = () => {
        setIsEditingPreferences(!isEditingPreferences);
    };

    // Save preferences (simulating updating the loggedInUser's preferences)
    const handleSavePreferences = () => {
        loggedInUser.preferences = selectedPreferences; // Update the preferences
        setIsEditingPreferences(false);
    };

    // Cancel editing preferences and revert to the original preferences
    const handleCancelPreferencesEdit = () => {
        setSelectedPreferences(loggedInUser.preferences); // Revert to original preferences
        setIsEditingPreferences(false);
    };

    // Handle editing reviews (delete reviews)
    const handleDeleteReview = (reviewId) => {
        const confirmation = window.confirm(
            "Are you sure you want to delete this past review?"
        );
        if (confirmation) {
            console.log("Review deleted.");
            setUserReviewsState(prevState => prevState.filter(review => review.id !== reviewId));
        } else {
            console.log("Review delete canceled.");
        }
    };

    // Filter out selected preferences from the available preferences list
    const availablePreferences = preferencesList.filter(pref => !selectedPreferences.includes(pref));

    return (
        <div className="edit-profile-content">
            <div className="edit-profile-header">
                <div className="edit-profile-image">
                    <img
                        src={loggedInUser.image}
                        alt={`${loggedInUser.name}'s profile`}
                        className="edit-profile-image"
                    />
                </div>
                <div className="edit-profile-info">
                    <div className="edit-profile-name">{loggedInUser.name}</div>
                    <div className="edit-profile-occupation">{loggedInUser.occupation}</div>
                    <div className="edit-profile-location">{loggedInUser.city}, {loggedInUser.state}</div>
                    <Link
                        to={`/profile`}
                        className="goback-profile-btn"
                    >
                        Go back to Profile
                    </Link>
                </div>
            </div>

            <div className="edit-profile-cards-section">
                <div className="edit-profile-card">
                    <div className="edit-profile-about-me">
                        <p><span className="edit-highlight">Edit </span>About Me</p>
                        <button 
                            className="edit-button" 
                            onClick={() => setIsEditingAboutMe(!isEditingAboutMe)}
                        >
                            <img src={edit} alt="Edit" />
                        </button>
                    </div>
                    {isEditingAboutMe ? (
                        <div className="edit-about-me-form">
                            <textarea
                                className="about-me-textarea"
                                value={aboutMeText}
                                onChange={(e) => setAboutMeText(e.target.value)}
                            />
                            <div className="button-container">
                                <button className="primary-btn save-button" onClick={handleSaveAboutMe}>
                                    Save
                                </button>
                                <button 
                                    className="secondary-btn cancel-button" 
                                    onClick={handleCancelEdit}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="edit-profile-description">
                            {originalAboutMe || 'No description provided.'}
                        </div>
                    )}
                </div>

                <div className="edit-profile-card">
                    <div className="edit-profile-preferences">
                        <p><span className="edit-highlight">Edit </span>Preferences & Lifestyle</p>
                        <button 
                            className="edit-button" 
                            onClick={handleEditPreferencesClick}
                        >
                            <img src={edit} alt="Edit" />
                        </button>
                    </div>
                    {isEditingPreferences ? (
                        <div className="profile-preferences">
                            <div className="current-preferences">
                                Current Preferences:
                                <div className="selected-profile-preferences">
                                    {selectedPreferences.length > 0 ? (
                                        selectedPreferences.map((pref) => (
                                            <Badge
                                                key={pref}
                                                className={`selected-profile-preference-tag ${getPreferenceCategoryClass(pref)}`}
                                                onClick={() => handleBadgeClick(pref)} // Remove on click
                                                style={{ cursor: 'pointer' }}
                                            >
                                                {pref} <span style={{ fontWeight: 'bold' }}>×</span>
                                            </Badge>
                                        ))
                                    ) : (
                                        <h5>No preferences selected.</h5>
                                    )}
                                </div>
                            </div>
                            <div className="available-preferences">
                                Available Preferences:
                                <div className="selected-profile-preferences">
                                    {availablePreferences.length > 0 ? (
                                        availablePreferences.map((pref) => (
                                        <Badge
                                            key={pref}
                                            className={`profile-preference-tag ${selectedPreferences.includes(pref) ? 'selected-profile-preference-tag' : ''} ${getPreferenceCategoryClass(pref)}`}
                                            onClick={() => handleBadgeClick(pref)} // Add or remove on click
                                            style={{ cursor: 'pointer' }}
                                        >
                                            {pref}
                                        </Badge>
                                    ))
                                ) : (
                                    <h5>No more preferences available.</h5>
                                    )}
                                </div>
                            </div>
                            <div className="button-container">
                                <button className="primary-btn save-button" onClick={handleSavePreferences}>
                                    Save
                                </button>
                                <button 
                                    className="secondary-btn cancel-button" 
                                    onClick={handleCancelPreferencesEdit}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="selected-profile-preferences">
                            {selectedPreferences.length > 0 ? (
                                selectedPreferences.map((pref) => (
                                    <Badge
                                        key={pref}
                                        className={`selected-profile-preference-tag ${getPreferenceCategoryClass(pref)}`}
                                        onClick={isEditingPreferences ? () => handleBadgeClick(pref) : undefined} // Disable click if not in edit mode
                                        style={{ cursor: isEditingPreferences ? 'pointer' : 'default' }}
                                    >
                                        {pref} {isEditingPreferences && <span style={{ fontWeight: 'bold' }}>×</span>}
                                    </Badge>
                                ))
                            ) : (
                                <h5>No preferences selected.</h5>
                            )}
                        </div>
                    )}
                </div>

                <div className="edit-profile-card">
                    <div className="edit-profile-reviews">
                        <p><span className="edit-highlight">Remove </span>Past Reviews</p>
                        <button 
                            className="edit-button" 
                            onClick={() => setIsEditingReviews(!isEditingReviews)}
                        >
                            <img src={edit} alt="Edit" />
                        </button>
                    </div>
                    {isEditingReviews ? (
                        <div className="edit-reviews-list">
                            {userReviewsState.length > 0 ? (
                                userReviewsState.map((review) => (
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
                                            <button 
                                                className="delete-review-button"
                                                onClick={() => handleDeleteReview(review.id)}
                                            >
                                                Delete
                                            </button>
                                    </div>
                                ))
                            ) : (
                                <h5>No reviews found.</h5>
                            )}
                        </div>
                    ) : (
                        userReviewsState.length > 0 ? (
                            userReviewsState.map((review) => (
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
                        )
                    )}
                </div>
                <div className="edit-profile-card">
                    <div className="edit-profile-settings">Account Settings</div>
                </div>
                <div className="edit-profile-card">
                    <div className="edit-profile-account-details">Account Details</div>
                </div>
            </div>
        </div>
    );
};

export default EditProfilePage;
