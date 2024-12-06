import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import leftarrow from "../assets/images/button-icons/left-arrow.svg";
import rightarrow from "../assets/images/button-icons/right-arrow.svg";
import config from "../components/config.json";
import "./HomePage.css";

const HomePage = ({ userId, sortKey, userCity }) => {
    const [topRatedList, setTopRatedList] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [activeTopRatedIndex, setActiveTopRatedIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        console.log("userCity received by HomePage:", userCity);
    }, [userCity]);

    // Fetch Top-Rated Users
    useEffect(() => {
        const fetchTopRatedUsers = async () => {
            const url = `${config.apiBaseUrl}/get-top-users`;
            try {
                const response = await fetch(url);
                const data = await response.json();

                if (!response.ok) throw new Error("Failed to fetch review data.");

                console.log("Fetched top-rated users:", data);
                setTopRatedList(data.topRatedUsers || []);
                setLoading(false);
            } catch (err) {
                setError("An error occurred while fetching top-rated users.");
                setLoading(false);
            }
        };
        fetchTopRatedUsers();
    }, []);

    // Fetch Search Results
    const fetchSearchResults = async (query) => {
        setLoading(true);
        setError("");
        try {
            const response = await fetch(
                `${config.apiBaseUrl}/search?searchTerm=${encodeURIComponent(query)}`
            );
            const data = await response.json();
            console.log("Fetched explore-section users:", data);
            if (response.ok) {
                // Filter out the logged-in user
                const filtered = data.results?.filter((user) => user.UserId !== userId);
                setFilteredUsers(filtered || []);
            } else {
                setFilteredUsers([]);
                setError(data.message || "Error fetching results.");
            }
        } catch (err) {
            setError("An error occurred while fetching search results.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (userCity && userCity.trim() !== "") {
            fetchSearchResults(userCity);
        } else {
            setFilteredUsers([]);
        }
    }, [userCity]);

    // Handle next and previous buttons for top-rated users
    const handleNext = () => {
        setActiveTopRatedIndex(
        (prevIndex) => (prevIndex + 1) % topRatedList.length
        );
    };

    const handlePrevious = () => {
        setActiveTopRatedIndex(
        (prevIndex) => (prevIndex - 1 + topRatedList.length) % topRatedList.length
        );
    };

    if (loading) {
        return (
        <div className="general-content">
            <h2>Loading...</h2>
        </div>
        );
    }

    if (error) {
        return (
        <div className="general-content">
            <h3>Error: {error}</h3>
        </div>
        );
    }

    return (
        <div className="homepage-content">
        {/* Top-Rated Section */}
        <div className="top-rated-section">
            <h2>
            Top-Rated <span className="highlight2">Roommates</span>
            </h2>
            {topRatedList.length > 0 ? (
            <div className="top-rated-container">
                <button onClick={handlePrevious} className="navigation-button">
                <img src={leftarrow} alt="previous" className="arrow-icon" />
                </button>

                {/* Display Only the Active Top-Rated Card */}
                <div
                className="top-rated-card-link"
                onClick={() =>
                    navigate(
                    `/reviews/${topRatedList[activeTopRatedIndex].RecipientId}`
                    )
                }
                >
                <div
                    className="top-rated-card"
                    key={topRatedList[activeTopRatedIndex].Username}
                >
                    <div className="top-rated-profile-image-container">
                    <img
                        src={
                        topRatedList[activeTopRatedIndex].ProfilePicture ||
                        "https://res.cloudinary.com/djx2y175z/image/upload/v1733203679/profile0_mcl0ts.png"
                        }
                        alt={`${
                        topRatedList[activeTopRatedIndex] || "User"
                        }'s profile`}
                        className="top-rated-profile-image"
                    />
                    </div>
                    <div className="top-rated-card-container">
                    <div className="top-rated-profile-info-container">
                        <div className="top-rated-profile-info">
                        <div className="top-rated-profile-name">
                            {topRatedList[activeTopRatedIndex].FirstName}{" "}
                            {topRatedList[activeTopRatedIndex].LastName}
                        </div>
                        <div className="top-rated-profile-occupation">
                            {topRatedList[activeTopRatedIndex].Occupation}
                        </div>
                        <div className="top-rated-profile-description">
                            {topRatedList[activeTopRatedIndex].AboutMe}
                        </div>
                        </div>

                        <div className="top-rated-location-favorite-container">
                        <div className="top-rated-location">
                            {topRatedList[activeTopRatedIndex].City},{" "}
                            {topRatedList[activeTopRatedIndex].State}
                        </div>
                        </div>
                    </div>
                    <div className="top-rated-profile-score">
                        <span className="highlight4">
                        {(topRatedList[activeTopRatedIndex].AverageScore || 0).toFixed(1)}/5
                        </span>{" "}
                        Rating
                    </div>
                    </div>
                </div>
                </div>

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
            {userId ? (
                filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                        <div
                            key={user.username}
                            className="profile-card"
                            onClick={() => navigate(`/reviews/${user.UserId}`)}
                        >
                            <div className="profile-info-container">
                                <div className="profile-image-container">
                                    <img
                                        src={
                                            user.profile_picture ||
                                            "https://res.cloudinary.com/djx2y175z/image/upload/v1733203679/profile0_mcl0ts.png"
                                        }
                                        alt={`${user.username || "User"}'s profile`}
                                        className="profile-image"
                                    />
                                    <div className="profile-info">
                                        <div className="profile-name">
                                            {user.first_name} {user.last_name}
                                        </div>
                                        <div className="profile-score">
                                            <span className="highlight5">
                                                {user.Score === 0 ? "N/A" : `${user.rating}/5`}
                                            </span>{" "}
                                            Rating
                                        </div>
                                        <div className="profile-occupation">{user.occupation}</div>
                                        <div className="profile-description">{user.ProfileData?.aboutMe}</div>
                                    </div>
                                </div>
                                <div className="profile-location">
                                    {user.city}, {user.state}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <h3>No roommates found near you.</h3>
                )
            ) : (
                <h3>You must log in to view roommates near you.</h3>
            )}
        </div>
    </div>
    );
};

export default HomePage;
