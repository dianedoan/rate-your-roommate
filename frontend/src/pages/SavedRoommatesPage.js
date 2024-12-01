import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for dynamic routing
import { userList, reviewsData } from "../data/userData";
import heart2 from '../assets/images/button-icons/heart2.svg'; 
import heart2filled from '../assets/images/button-icons/heart2-filled.svg';

function SavedRoommatesPage() {
    // Manually set logged in user
    const loggedInUser = userList.find(user => user.username === 'sallysmith');
    
    // Manage the list of liked profiles based on the logged-in user
    const [likedProfiles, setLikedProfiles] = useState(loggedInUser.likedProfiles);
    
    const [searchQuery, setSearchQuery] = useState(''); // Search input state
    const navigate = useNavigate();

    // Function to calculate average rating for a user based on their reviews
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
    const usersWithRatings = userList.map(user => ({
        ...user,
        rating: calculateAverageRating(user.id), // Calculate and add the average rating
    }));

    // Filter the users from likedProfiles by matching with search query
    const filteredUsers = usersWithRatings.filter((user) =>
        likedProfiles.includes(user.username) && (
            user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.state.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    // Function to toggle the liked status (removing or re-adding profiles)
    const toggleLike = (userName) => {
        setLikedProfiles((prevLikes) => {
            const updatedLikes = [...prevLikes];  // Copy the current list of liked profiles

            if (updatedLikes.includes(userName)) {
                // If already liked, remove from the saved profiles
                const index = updatedLikes.indexOf(userName);
                updatedLikes.splice(index, 1);
            } else {
                // Add user to likedProfiles if not already liked
                updatedLikes.push(userName);
            }

            console.log('Liked Profiles:', updatedLikes); // Log the updated liked profiles

            return updatedLikes;
        });
    };

    // Function to navigate to the user's review page
    const goToUserProfile = (userId) => {
        navigate(`/reviews/${userId}`); // Navigate to the review page of the clicked user
    };

    return (
        <div className="general-content">
            <h2>Saved <span className="highlight3">Roommates</span></h2>
            {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                    <div 
                    key={user.username}
                    className="profile-card" 
                    onClick={() => goToUserProfile(user.id)} // Make card clickable
                    >
                        <div className="profile-info-container">
                            <div className="profile-image-container">
                                <img
                                    src={user.image}
                                    alt={user.username}
                                    className="profile-image"
                                />
                            </div>
                            <div className="profile-info">
                                <div className="profile-name">{user.firstName} {user.lastName}</div>
                                <div className="profile-score">
                                    <span className="highlight5">
                                        {user.rating === 0 ? "N/A" : `${user.rating}/5`}
                                    </span> Rating
                                </div>
                                <div className="profile-occupation">{user.occupation}</div>
                                <div className="profile-description">{user.description}</div>
                            </div>
                        </div>
                        <div className="location-favorite-container">
                            <p className="profile-location">{user.city}, {user.state}</p>
                            <div className="favorite-icon">
                                <img
                                    src={likedProfiles.includes(user.username) ? heart2filled : heart2}
                                    alt="heart icon"
                                    className="heart-icon"
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent navigation when clicking the heart icon
                                        toggleLike(user.username); // Toggle like on click
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
