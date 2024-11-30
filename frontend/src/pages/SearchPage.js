import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { userList, reviewsData } from "../data/userData";  // Ensure you import necessary data
import heart2 from '../assets/images/button-icons/heart2.svg'; 
import heart2filled from '../assets/images/button-icons/heart2-filled.svg'; 
import "./SearchPage.css";

// Function to calculate average rating
const calculateAverageRating = (userId) => {
    const userReviews = reviewsData.filter(review => review.userId === userId);
    const totalScore = userReviews.reduce((acc, review) => acc + parseFloat(review.score), 0);
    const averageRating = totalScore / userReviews.length;
    return averageRating ? Math.round(averageRating * 10) / 10 : 0;  // Round to 1 decimal place
};

function SearchPage() {
    // Manually set logged in user
    const loggedInUser = userList.find(user => user.username === 'sallysmith');
    
    const [searchQuery, setSearchQuery] = useState(''); // Search input state
    const [likedProfiles, setLikedProfiles] = useState(loggedInUser.likedProfiles);

    const navigate = useNavigate(); // Hook for navigation

    // Add dynamic rating calculation to each user
    const userListWithRatings = userList.map(user => ({
        ...user,
        rating: calculateAverageRating(user.id), // Calculate and add the average rating for each user
    }));

    // Filter the users based on search input (name, state/province, city)
    const filteredUsers = userListWithRatings.filter((user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.state.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Function to toggle the liked status (removing or re-adding profiles)
    const toggleLike = (userName) => {
        setLikedProfiles((prevLikes) => {
            const updatedLikes = [...prevLikes]; // Copy the current list of liked profiles

            if (updatedLikes.includes(userName)) {
                // If the user is already liked, remove them
                const index = updatedLikes.indexOf(userName);
                updatedLikes.splice(index, 1);
            } else {
                // If the user is not liked, add them
                updatedLikes.push(userName);
            }

            console.log("Liked Profiles:", updatedLikes); // Log the updated liked profiles

            return updatedLikes;
        });
    };

    // Function to navigate to the user's review page
    const goToUserProfile = (userId) => {
        navigate(`/reviews/${userId}`); // Navigate to the review page of the clicked user
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
                        {filteredUsers.map((user) => (
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
                                    <div className="profile-name">{user.firstName} {user.lastName}</div>
                                    <div className="profile-score">
                                        <span className="highlight5">
                                            {user.rating === 0 ? "N/A" : `${user.rating}/5`}
                                        </span>
                                        {user.rating !== 0 && " Rating"}
                                    </div>
                                    <div className="profile-occupation">{user.occupation}</div>
                                    <div className="profile-description">{user.description}</div>
                                </div>
                                <div className="location-favorite-container">
                                    <p className="profile-location">{user.city}, {user.state}</p>
                                    <div className="favorite-icon">
                                        <img
                                            // Change heart icon based on whether the profile is liked
                                            src={likedProfiles.includes(user.name) ? heart2filled : heart2}
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
