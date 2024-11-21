import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for dynamic routing
import { userList, getInitialLikedProfiles } from "../data/userData";
import heart2 from '../assets/images/button-icons/heart2.svg'; 
import heart2filled from '../assets/images/button-icons/heart2-filled.svg'; 
import "./SearchPage.css";

function SearchPage() {
    const [searchQuery, setSearchQuery] = useState(''); // Search input state
    const [likedProfiles, setLikedProfiles] = useState(getInitialLikedProfiles());
    const navigate = useNavigate(); // Hook for navigation

    // Filter the users based on search input (name, city)
    const filteredUsers = userList.filter((user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.state.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Function to toggle the liked status
    const toggleLike = (userName) => {
        setLikedProfiles((prevLikes) => {
            const updatedLikes = { ...prevLikes };

            if (updatedLikes[userName]) {
                // If already liked, remove from liked profiles
                delete updatedLikes[userName];
            } else {
                // If not liked yet, find the user and add to liked profiles
                const user = userList.find((u) => u.name === userName);
                updatedLikes[userName] = user;
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
            <h2>Search</h2>
            <div className="search-results">
                <Form.Group controlId="search" className="search-bar">
                    <Form.Label></Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Search by name, state/province, or city"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)} // Update the search query
                        className="mb-3"
                    />
                </Form.Group>
                {searchQuery.trim() === '' ? ( // Check if searchQuery is empty
                    <></> // Render nothing if searchQuery is empty
                ) : filteredUsers.length > 0 ? (
                    <div className="search-results">
                        {filteredUsers.map((user, index) => (
                            <div key={index} className="profile-card" onClick={() => goToUserProfile(user.id)}> {/* Make card clickable */}
                                <div className="profile-image-container">
                                    <img
                                        src={user.image} // Use the imported image
                                        alt={user.name}
                                        className="profile-image"
                                    />
                                </div>
                                <div className="profile-info">
                                    <div className="profile-name">{user.firstName} {user.lastName}</div>
                                    <div className="profile-score">
                                        <span className="highlight5">{user.rating}/5</span> Rating
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
                        ))}
                    </div>
                ) : (
                    <h3>Sorry, we couldn't find any results.</h3>
                )}
            </div>
        </div>
    );
}

export default SearchPage;
