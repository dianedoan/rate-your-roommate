import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for dynamic routing
import { getInitialLikedProfiles } from "../data/userData";
import heart2 from '../assets/images/button-icons/heart2.svg'; 
import heart2filled from '../assets/images/button-icons/heart2-filled.svg';

function SavedRoommatesPage() {
    const [searchQuery, setSearchQuery] = useState(''); // Search input state
    const [likedProfiles, setLikedProfiles] = useState(getInitialLikedProfiles());
    const navigate = useNavigate(); // Hook for navigation

    const filteredUsers = Object.values(likedProfiles).filter((user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.state.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    // Function to toggle the liked status (removing or re-adding profiles)
    const toggleLike = (userName) => {
        setLikedProfiles((prevLikes) => {
            const updatedLikes = { ...prevLikes };

            if (updatedLikes[userName]) {
                // If already liked, remove from the saved profiles
                delete updatedLikes[userName];
            } else {
                console.warn(`${userName} cannot be re-added here. This is the saved list.`);
            }

            // Log the list of liked profiles to the console
            console.log('Liked Profiles:', Object.values(updatedLikes));

            return updatedLikes;
        });
    };

    // Function to navigate to the user's review page
    const goToUserProfile = (userId) => {
        navigate(`/review/${userId}`); // Navigate to the review page of the clicked user
    };

    return (
        <div className="general-content">
            <h2>Saved <span className="highlight3">Roommates</span></h2>
            {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                    <div 
                    key={user.name}
                    className="profile-card" 
                    onClick={() => goToUserProfile(user.id)} // Make card clickable
                    >
                        <div className="profile-image-container">
                            <img
                                src={user.image}
                                alt={user.name}
                                className="profile-image"
                            />
                        </div>
                        <div className="profile-info">
                            <div className="profile-name">{user.name}</div>
                            <div className="profile-score">
                                <span className="highlight5">
                                    {user.rating === 0 ? "N/A" : `${user.rating}/5`}
                                </span> Rating
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
                                        e.stopPropagation(); // Prevent navigation when clicking the heart icon
                                        toggleLike(user.name); // Toggle like on click
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <h3>No saved roommates found.</h3>
            )}
        </div>
    );
}

export default SavedRoommatesPage;
