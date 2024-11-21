import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { userListWithRatings, getInitialLikedProfiles, getTopRatedList } from "../data/userData";
import heart2 from "../assets/images/button-icons/heart2.svg";
import heart2filled from "../assets/images/button-icons/heart2-filled.svg";
import leftarrow from "../assets/images/button-icons/left-arrow.svg";
import rightarrow from "../assets/images/button-icons/right-arrow.svg";
import "./HomePage.css";

const HomePage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [likedProfiles, setLikedProfiles] = useState(getInitialLikedProfiles());
    const [activeTopRatedIndex, setActiveTopRatedIndex] = useState(0);

    const topRatedList = getTopRatedList();

    const filteredUsers = userListWithRatings.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.state.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const toggleLike = (userName) => {
        setLikedProfiles((prevLikes) => {
            const user = userListWithRatings.find(u => u.name === userName);
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

    return (
        <div className="homepage-content">
            {/* Top-Rated Section */}
            <div className="top-rated-section">
                <h2>Top-Rated <span className="highlight2">Roommates</span></h2>
                <div className="top-rated-container">
                    
                    {/* Previous Button */}
                    <button onClick={handlePrevious} className="navigation-button">
                        <img src={leftarrow} alt="previous" className="arrow-icon" />
                    </button>

                    {/* Active Top-Rated Card */}
                    <Link to={`/review/${topRatedList[activeTopRatedIndex].id}`} className="top-rated-card-link">
                        <div className="top-rated-card" key={topRatedList[activeTopRatedIndex].name}>
                            <div className="profile-image-container">
                                <img
                                    src={topRatedList[activeTopRatedIndex].image}
                                    alt={topRatedList[activeTopRatedIndex].name}
                                    className="top-rated-profile-image"
                                />
                            </div>
                            <div className="top-rated-profile-info">
                                <div className="top-rated-profile-name">{topRatedList[activeTopRatedIndex].name}</div>
                                <div className="top-rated-profile-occupation">{topRatedList[activeTopRatedIndex].occupation}</div>
                                <div className="top-rated-profile-description">{topRatedList[activeTopRatedIndex].description}</div>
                                <div className="top-rated-profile-score">
                                    <span className="highlight4">{topRatedList[activeTopRatedIndex].rating}/5</span> Rating
                                </div>
                            </div>
                            <div className="location-favorite-container">
                                <p className="top-rated-location">
                                    {topRatedList[activeTopRatedIndex].city}, {topRatedList[activeTopRatedIndex].state}
                                </p>
                                <div className="favorite-icon">
                                    <img
                                        src={likedProfiles[topRatedList[activeTopRatedIndex].name] ? heart2filled : heart2}
                                        alt="heart icon"
                                        className="heart-icon"
                                        onClick={(e) => {
                                            e.preventDefault(); // Prevent link navigation when toggling like
                                            toggleLike(topRatedList[activeTopRatedIndex].name);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </Link>

                    {/* Next Button */}
                    <button onClick={handleNext} className="navigation-button">
                        <img src={rightarrow} alt="next" className="arrow-icon" />
                    </button>
                </div>
            </div>

            {/* Explore Section */}
            <div className="explore-section">
                <h2>Explore <span className="highlight3">Roommates</span></h2>
                {filteredUsers.map((user) => (
                    <Link to={`/review/${user.id}`} key={user.id} className="profile-card-link">
                        <div className="profile-card">
                            <div className="profile-image-container">
                                <img src={user.image} alt={user.name} className="profile-image" />
                            </div>
                            <div className="profile-info">
                                <div className="profile-name">{user.name}</div>
                                <div className="profile-score">
                                    <span className="highlight5">{user.rating === 0 ? "N/A " : `${user.rating}/5 `}</span>
                                    Rating
                                </div>
                                <div className="profile-occupation">{user.occupation}</div>
                                <div className="profile-description">{user.description}</div>
                            </div>
                            <div className="location-favorite-container">
                                <p className="profile-location">{user.city}, {user.state}</p>
                                <div className="favorite-icon">
                                    <img
                                        src={likedProfiles[user.name] ? heart2filled : heart2}
                                        alt="heart icon"
                                        className="heart-icon"
                                        onClick={(e) => {
                                            e.preventDefault(); // Prevent the link from triggering
                                            toggleLike(user.name);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default HomePage;
