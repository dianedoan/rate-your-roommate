import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userList, reviewsData, getInitialLikedProfiles } from "../data/userData";
import heart2 from "../assets/images/button-icons/heart2.svg";
import heart2filled from "../assets/images/button-icons/heart2-filled.svg";
import leftarrow from "../assets/images/button-icons/left-arrow.svg";
import rightarrow from "../assets/images/button-icons/right-arrow.svg";
import "./HomePage.css";

const HomePage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTopRatedIndex, setActiveTopRatedIndex] = useState(0);
    const [likedProfiles, setLikedProfiles] = useState(getInitialLikedProfiles());

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

    // Add dynamic rating calculation to each user
    const userListWithRatings = userList.map(user => ({
        ...user,
        rating: calculateAverageRating(user.id), // Calculate and add the average rating
    }));

    // Filter users with a rating of 4.0 or higher for top-rated roommates
    const topRatedList = userListWithRatings.filter(user => user.rating >= 4.0);

    const filteredUsers = userListWithRatings.filter((user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.state.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const toggleLike = (userName) => {
        setLikedProfiles((prevLikes) => {
            const user = userListWithRatings.find((u) => u.name === userName);
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

    const handleNext = () => {
        setActiveTopRatedIndex((prevIndex) => (prevIndex + 1) % topRatedList.length);
    };

    const handlePrevious = () => {
        setActiveTopRatedIndex((prevIndex) => (prevIndex - 1 + topRatedList.length) % topRatedList.length);
    };

    const goToUserProfile = (userId) => {
        navigate(`/reviews/${userId}`);
    };

    return (
        <div className="homepage-content">
            {/* Top-Rated Section */}
            <div className="top-rated-section">
                <h2>
                    Top-Rated <span className="highlight2">Roommates</span>
                </h2>
                {topRatedList.length > 0 ? (
                    <div className="top-rated-container">
                        {/* Previous Button */}
                        <button onClick={handlePrevious} className="navigation-button">
                            <img src={leftarrow} alt="previous" className="arrow-icon" />
                        </button>

                        {/* Display Only the Active Top-Rated Card */}
                        <div
                            className="top-rated-card-link"
                            onClick={() => navigate(`/reviews/${topRatedList[activeTopRatedIndex].id}`)}
                        >
                            <div className="top-rated-card" key={topRatedList[activeTopRatedIndex].name}>
                                <div className="profile-image-container">
                                    <img
                                        src={topRatedList[activeTopRatedIndex].image}
                                        alt={topRatedList[activeTopRatedIndex].name}
                                        className="top-rated-profile-image"
                                    />
                                </div>
                                <div className="top-rated-profile-info">
                                    <div className="top-rated-profile-name">
                                        {topRatedList[activeTopRatedIndex].name}
                                    </div>
                                    <div className="top-rated-profile-occupation">
                                        {topRatedList[activeTopRatedIndex].occupation}
                                    </div>
                                    <div className="top-rated-profile-description">
                                        {topRatedList[activeTopRatedIndex].description}
                                    </div>
                                    <div className="top-rated-profile-score">
                                        <span className="highlight4">
                                            {topRatedList[activeTopRatedIndex].rating}/5
                                        </span>{" "}
                                        Rating
                                    </div>
                                </div>
                                <div className="location-favorite-container">
                                    <p className="top-rated-location">
                                        {topRatedList[activeTopRatedIndex].city},{" "}
                                        {topRatedList[activeTopRatedIndex].state}
                                    </p>
                                    <div className="favorite-icon">
                                        <img
                                            src={
                                                likedProfiles[topRatedList[activeTopRatedIndex].name]
                                                    ? heart2filled
                                                    : heart2
                                            }
                                            alt="heart icon"
                                            className="heart-icon"
                                            onClick={(e) => {
                                                e.stopPropagation(); // Prevent propagation to avoid navigating when clicking the heart icon
                                                toggleLike(topRatedList[activeTopRatedIndex].name); // Use the name of the active top-rated user
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Next Button */}
                        <button onClick={handleNext} className="navigation-button">
                            <img src={rightarrow} alt="next" className="arrow-icon" />
                        </button>
                    </div>
                ) : (
                    <h3>No top-rated roommates found.</h3>
                )}
            </div>

            {/* Explore Section */}
            <div className="explore-section">
                <h2>
                    Explore <span className="highlight3">Roommates</span>
                </h2>
                {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                        <div
                            key={user.name}
                            className="profile-card"
                            onClick={() => goToUserProfile(user.id)}
                        >
                            <div className="profile-image-container">
                                <img src={user.image} alt={user.name} className="profile-image" />
                            </div>
                            <div className="profile-info">
                                <div className="profile-name">{user.name}</div>
                                <div className="profile-score">
                                    <span className="highlight5">
                                        {user.rating === 0 ? "N/A" : `${user.rating}/5`}
                                    </span>{" "}
                                    Rating
                                </div>
                                <div className="profile-occupation">{user.occupation}</div>
                                <div className="profile-description">{user.description}</div>
                            </div>
                            <div className="location-favorite-container">
                                <p className="profile-location">
                                    {user.city}, {user.state}
                                </p>
                                <div className="favorite-icon">
                                    <img
                                        src={likedProfiles[user.name] ? heart2filled : heart2}
                                        alt="heart icon"
                                        className="heart-icon"
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent navigation when clicking the heart icon
                                            toggleLike(user.name); // Toggle like on click
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <h3>No roommates found.</h3>
                )}
            </div>
        </div>
    );
};

export default HomePage;
