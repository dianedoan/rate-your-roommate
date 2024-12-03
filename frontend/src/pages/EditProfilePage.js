import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Badge } from "react-bootstrap";
import edit from "../assets/images/button-icons/edit.svg";
import config from "../components/config.json";
import "./EditProfilePage.css";

const EditProfilePage = ({ userId, sortKey }) => {
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [profilePicture, setProfilePicture] = useState("");
    const [isEditingProfilePicture, setIsEditingProfilePicture] = useState(false);
    const [aboutMeText, setAboutMeText] = useState("");
    const [isEditingAboutMe, setIsEditingAboutMe] = useState(false);
    const [selectedPreferences, setSelectedPreferences] = useState([]);
    const [isEditingPreferences, setIsEditingPreferences] = useState(false);
    const [accountDetails, setAccountDetails] = useState({});
    const [isEditingAccount, setIsEditingAccount] = useState(false);
    const [isEditingReviews, setIsEditingReviews] = useState(false);
    
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch(
                    `${
                        config.apiBaseUrl
                    }/fetch-profile?UserId=${userId}&SortKey=${encodeURIComponent(
                        sortKey
                    )}`
                );
                
                if (!response.ok) throw new Error("Failed to fetch profile data.");
                
                const data = await response.json();
                setUserProfile(data);
                setProfilePicture(data.profile_picture);
                setAboutMeText(data?.ProfileData?.aboutMe || "");
                setSelectedPreferences(data?.ProfileData?.preferences || []);
                setAccountDetails({
                    username: data.username,
                    email: data.email,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    occupation: data.occupation,
                    country: data.country,
                    state: data.state,
                    city: data.city,
                });
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError("Failed to fetch profile data.");
                setLoading(false);
            }
        };
        fetchProfile();
    }, [userId, sortKey]);
    
    const updateProfile = async (updatedFields) => {
        try {
            const response = await fetch(`${config.apiBaseUrl}/update-profile`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    UserId: userId,
                    "DataType#Timestamp": sortKey,
                    ...updatedFields,
                }),
            });
            
            if (!response.ok) throw new Error("Failed to update profile.");
            
            return response.ok;
        } catch (err) {
            console.error(err);
            throw new Error(err.message || "An error occurred while updating.");
        }
    };
    
    // List of available profile images
    const profileImages = [
        "https://res.cloudinary.com/djx2y175z/image/upload/v1733203679/profile0_mcl0ts.png",
        "https://res.cloudinary.com/djx2y175z/image/upload/v1733203679/profile1_d6xrom.jpg",
        "https://res.cloudinary.com/djx2y175z/image/upload/v1733203676/profile19_tege5h.jpg",
        "https://res.cloudinary.com/djx2y175z/image/upload/v1733203678/profile20_rfhn8e.jpg",
        "https://res.cloudinary.com/djx2y175z/image/upload/v1733203674/profile17_lcdwbc.jpg",
        "https://res.cloudinary.com/djx2y175z/image/upload/v1733203676/profile18_nblubv.jpg",
        "https://res.cloudinary.com/djx2y175z/image/upload/v1733203672/profile15_k86rjz.jpg",
        "https://res.cloudinary.com/djx2y175z/image/upload/v1733203673/profile16_n3zprz.jpg",
        "https://res.cloudinary.com/djx2y175z/image/upload/v1733203670/profile13_brhjvi.jpg",
        "https://res.cloudinary.com/djx2y175z/image/upload/v1733203671/profile14_lcgidt.jpg",
        "https://res.cloudinary.com/djx2y175z/image/upload/v1733203668/profile11_dthwri.jpg",
        "https://res.cloudinary.com/djx2y175z/image/upload/v1733203669/profile12_hnmi28.jpg",
        "https://res.cloudinary.com/djx2y175z/image/upload/v1733203666/profile9_aw0wzy.jpg",
        "https://res.cloudinary.com/djx2y175z/image/upload/v1733203667/profile10_svilng.jpg",
        "https://res.cloudinary.com/djx2y175z/image/upload/v1733203664/profile7_c5rcbz.jpg",
        "https://res.cloudinary.com/djx2y175z/image/upload/v1733203665/profile8_mbjvao.jpg",
        "https://res.cloudinary.com/djx2y175z/image/upload/v1733203662/profile5_tap39x.jpg",
        "https://res.cloudinary.com/djx2y175z/image/upload/v1733203663/profile6_nzeod5.jpg",
        "https://res.cloudinary.com/djx2y175z/image/upload/v1733203659/profile3_jnri7g.jpg",
        "https://res.cloudinary.com/djx2y175z/image/upload/v1733203661/profile4_oit0aj.jpg",
        "https://res.cloudinary.com/djx2y175z/image/upload/v1733203659/profile2_uww4pq.jpg"
    ];
    
    const handleSaveProfilePicture = async () => {
        try {
            await updateProfile({
                profile_picture: accountDetails.profile_picture
            });
            
            setIsEditingProfilePicture(false); 
            alert("Profile picture updated successfully!");
        } catch (err) {
            alert(err.message);
        }
    };

    const handleSaveAboutMe = async () => {
        try {
            await updateProfile({
                ProfileData: {
                    aboutMe: aboutMeText,
                    preferences: selectedPreferences,
                },
            });

            setUserProfile((prev) => ({
                ...prev,
                ProfileData: { ...prev.ProfileData, aboutMe: aboutMeText },
            }));
            setIsEditingAboutMe(false);
            alert("About Me updated successfully!");
        } catch (err) {
            alert(err.message);
        }
    };

    const handleSavePreferences = async () => {
        try {
            await updateProfile({
                ProfileData: {
                    aboutMe: aboutMeText,
                    preferences: selectedPreferences,
                },
            });
            setUserProfile((prev) => ({
                ...prev,
                ProfileData: { ...prev.ProfileData, preferences: selectedPreferences },
            }));
            setIsEditingPreferences(false);
            alert("Preferences updated successfully!");
        } catch (err) {
            alert(err.message);
        }
    };

    const handleSaveAccountDetails = async () => {
        if (!accountDetails.state || !accountDetails.city) {
            alert("State/Province and City fields are required.");
            return;
        }
        
        try {
            await updateProfile({
                username: accountDetails.username,
                email: accountDetails.email,
                firstName: accountDetails.firstName,
                lastName: accountDetails.lastName,
                occupation: accountDetails.occupation,
                country: accountDetails.country,
                state: accountDetails.state,
                city: accountDetails.city,
            });

            setIsEditingAccount(false);
            alert("Account details updated successfully!");
        } catch (err) {
            alert(err.message);
        }
    };
    
    // List of preference tags
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
    
    const availablePreferences = preferencesList.filter(pref => !selectedPreferences.includes(pref));
    
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
    
    const reviews = userProfile?.reviews || [];
    // const [userReviews, setUserReviews] = useState(reviewsData.filter(review => review.authorId === userId));
    
    // Function to generate the star rating based on score
    const generateStarRating = (score) => {
        const filledStars = '★'.repeat(Math.floor(score));
        const halfStar = score % 1 >= 0.5 ? '½' : ''; // Check if score has a .5 and add "½" if true
        return filledStars + halfStar;
    };
    
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="edit-profile-content">
            <div className="edit-profile-header">
                <div className="edit-profile-image-wrapper">
                    <img
                        src={profilePicture || "https://res.cloudinary.com/djx2y175z/image/upload/v1733203679/profile0_mcl0ts.png"}
                        alt={`${userProfile?.username || "User"}'s profile`}
                        className="edit-profile-image"
                    />
                    <button 
                        className="edit-profile-image-btn"
                        onClick={() => setIsEditingProfilePicture(!isEditingProfilePicture)}
                    >
                        ✎
                    </button>
                    {isEditingProfilePicture && (
                        <div className="image-selector-dropdown">
                            {profileImages.map((profile_picture, index) => (
                                <img
                                    key={index}
                                    src={profile_picture}
                                    alt={`Profile option ${index + 1}`}
                                    className="profile-option-image"
                                    onClick={() => handleSaveProfilePicture(profile_picture)}
                                />
                            ))}
                        </div>
                    )}
                </div>
                <div className="edit-profile-info">
                    <div className="edit-profile-name">
                        {accountDetails.firstName} {accountDetails.lastName}
                    </div>
                    <div className="edit-profile-occupation">
                        {accountDetails.occupation}
                    </div>
                    <div className="edit-profile-location">
                        {accountDetails.city}, {accountDetails.state}
                    </div>
                    <Link to="/profile" className="goback-profile-btn">
                        View Profile
                    </Link>
                </div>
            </div>

            {/* About Me Section */}
            <div className="user-profile-cards-section">
                <div className="user-profile-card">
                    <div className="edit-profile-about-me">
                        <p><span className="edit-highlight">Edit </span>About Me</p>
                        <button
                            className="edit-button"
                            onClick={() => setIsEditingAboutMe(!isEditingAboutMe)}
                            disabled={isEditingAboutMe}
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
                            <div className="edit-profile-button-container">
                                <button
                                    className="primary-btn save-button"
                                    onClick={handleSaveAboutMe}
                                >
                                    Save
                                </button>
                                <button
                                    className="secondary-btn cancel-button"
                                    onClick={() => setIsEditingAboutMe(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="user-profile-description">
                            {userProfile?.ProfileData?.aboutMe || "No description provided."}
                        </div>
                    )}
                </div>

                {/* Preferences Section */}
                <div className="user-profile-card">
                    <div className="edit-profile-preferences">
                        <p>
                            <span className="edit-highlight">Edit </span>Preferences & Lifestyle
                        </p>
                        <button
                            className="edit-button"
                            onClick={() => setIsEditingPreferences(!isEditingPreferences)}
                            disabled={isEditingPreferences}
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
                                                onClick={() =>
                                                    setSelectedPreferences((prev) =>
                                                        prev.filter((p) => p !== pref)
                                                        )
                                                }
                                                style={{ cursor: 'pointer' }}
                                            >
                                                {pref}
                                            </Badge>
                                        ))
                                    ) : (
                                        <h5>No preferences added.</h5>
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
                                                className={`profile-preference-tag ${getPreferenceCategoryClass(pref)}`}
                                                onClick={() =>
                                                    setSelectedPreferences((prev) => [...prev, pref])
                                                }
                                                style={{ cursor: 'pointer' }}
                                            >
                                                {pref}
                                            </Badge>
                                        ))
                                    ) : (
                                        <h5>No more available preferences.</h5>
                                    )}
                                </div>
                            </div>
                            <div className="edit-profile-button-container">
                                <button
                                    className="primary-btn save-button"
                                    onClick={handleSavePreferences}
                                >
                                    Save
                                </button>
                                <button
                                    className="secondary-btn cancel-button"
                                    onClick={() => setIsEditingPreferences(false)}
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
                                    >
                                        {pref}
                                    </Badge>
                                ))
                            ) : (
                                <h5>No preferences added.</h5>
                            )}
                        </div>
                    )}
                </div>
                <div className="user-profile-card">
                    <div className="edit-profile-account-details">
                        <div className="edit-profile-settings">
                            <p><span className="edit-highlight">Edit </span>Account Details</p>
                        </div>
                        <button
                            className="edit-button"
                            onClick={() => setIsEditingAccount(!isEditingAccount)}
                            disabled={isEditingAccount}
                        >
                            <img src={edit} alt="Edit" />
                        </button>
                    </div>
                    
                    {isEditingAccount ? (
                        <div className="account-details-form">
                            <div className="form-group">
                                <label>Username</label>
                                <input type="text" value={accountDetails.username} disabled />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email"value={accountDetails.email} disabled />
                            </div>
                            <div className="form-group">
                                <label>First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={accountDetails.firstName}
                                    onChange={(e) => setAccountDetails({ ...accountDetails, firstName: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={accountDetails.lastName}
                                    onChange={(e) => setAccountDetails({ ...accountDetails, lastName: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Occupation</label>
                                <input
                                    type="text"
                                    name="occupation"
                                    value={accountDetails.occupation}
                                    onChange={(e) => setAccountDetails({ ...accountDetails, occupation: e.target.value })}
                                />
                            </div>
                            <div className="location">
                                <div className="form-group">
                                    <label>Country</label>
                                    <select
                                        name="country"
                                        value={accountDetails.country}
                                        onChange={(e) => setAccountDetails({ ...accountDetails, country: e.target.value })}
                                    >
                                        <option disabled value="">Select...</option>
                                        <option>Canada</option>
                                        <option>USA</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>State/Province</label>
                                    <input
                                        type="text"
                                        name="state"
                                        value={accountDetails.state}
                                        onChange={(e) => setAccountDetails({ ...accountDetails, state: e.target.value })}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={accountDetails.city}
                                        onChange={(e) => setAccountDetails({ ...accountDetails, city: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="edit-profile-button-container">
                                <button className="primary-btn save-button" onClick={handleSaveAccountDetails}>
                                    Save
                                </button>
                                <button className="secondary-btn cancel-button" onClick={() => setIsEditingAccount(false)}>
                                    Cancel
                                </button>

                            </div>
                        </div>
                    ) : (
                        <div className="account-details">
                            <div className="account-username"><strong>Username: </strong> {accountDetails.username}</div>
                            <div className="account-email"><strong>Email: </strong> {accountDetails.email}</div>
                            <div className="account-first-name"><strong>First Name: </strong> {accountDetails.firstName}</div>
                            <div className="account-last-name"><strong>Last Name: </strong> {accountDetails.lastName}</div>
                            <div className="account-occupation"><strong>Occupation: </strong> {accountDetails.occupation}</div>
                            <div className="account-location">
                                <div className="account-country"><strong>Country: </strong>  {accountDetails.country}</div>
                                <div className="account-state"><strong>State/Province: </strong>  {accountDetails.state}</div>
                                <div className="account-city"><strong>City: </strong> {accountDetails.city}</div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="user-profile-card">
                    <div className="edit-profile-reviews">
                        <p><span className="edit-highlight">Remove </span>Past Reviews</p>
                        <button 
                            className="edit-button" 
                            onClick={() => setIsEditingReviews(!isEditingReviews)}
                            disabled={isEditingReviews || reviews.length === 0}
                        >
                            <img src={edit} alt="Edit" />
                        </button>
                    </div>
                    {isEditingReviews ? (
                        <div className="edit-reviews-list">
                            {reviews.length > 0 ? (
                                reviews.map((review) => (
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
                                                className="delete-review-btn"
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
                        reviews.length > 0 ? (
                            reviews.map((review) => (
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
            </div>
        </div>
    );
};

export default EditProfilePage;
