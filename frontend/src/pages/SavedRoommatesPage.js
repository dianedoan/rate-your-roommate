import React, { useState } from 'react';
import profile1 from "../assets/images/profile-pics/profile1.jpg";
import profile2 from "../assets/images/profile-pics/profile2.jpg";
import profile3 from "../assets/images/profile-pics/profile3.jpg";
import profile4 from "../assets/images/profile-pics/profile4.jpg";
import profile5 from "../assets/images/profile-pics/profile5.jpg";
import heart2 from '../assets/images/button-icons/heart2.svg'; 
import heart2filled from '../assets/images/button-icons/heart2-filled.svg';
import starfilled from '../assets/images/button-icons/star2-filled.svg'; 
import star2filled from '../assets/images/button-icons/star2.svg';  
import "./HomePage.css";

function SavedRoommatesPage() {
    const [searchQuery, setSearchQuery] = useState(''); // Search input state
    
    // Initialize likedRoommates to simulate saved roommates
    const [likedProfiles, setLikedProfiles] = useState({
        'Alice Wang': {
            name: 'Alice Wang',
            firstName: 'Alice',
            lastName: 'Wang',
            city: 'Calgary',
            state: 'AB',
            occupation: 'Athlete',
            rating: '4.5',
            description: 'I love skating and sleeping',
            image: profile1
        },
        'Bob Brown': {
            name: 'Bob Brown',
            firstName: 'Bob',
            lastName: 'Brown',
            city: 'Calgary',
            state: 'AB',
            occupation: 'Student',
            rating: '4.0',
            description: 'NEED a roommate ASAP',
            image: profile3
        }
    });

    const savedRoommates = [
        {
            name: 'Alice Wang',
            firstName: 'Alice',
            lastName: 'Wang',
            city: 'Calgary',
            state: 'AB',
            occupation: 'Athlete',
            rating: '4.5',
            description: 'I love skating and sleeping',
            image: profile1
        },
        {
            name: 'Bob Brown',
            firstName: 'Bob',
            lastName: 'Brown',
            city: 'Calgary',
            state: 'AB',
            occupation: 'Student',
            rating: '4.0',
            description: 'NEED a roommate ASAP',
            image: profile3
        },
    ];

    // Filter the saved roommates based on the search input (name, city)
    const filteredUsers = savedRoommates.filter((user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.state.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    // Function to toggle the liked status (if you want to allow unliking too)
    const toggleLike = (userName) => {
        setLikedProfiles((prevLikes) => {
            const updatedLikes = { ...prevLikes };

            if (updatedLikes[userName]) {
                // If already liked, remove from the saved profiles
                delete updatedLikes[userName];
            } else {
                // If not liked yet, add to the saved profiles
                const user = savedRoommates.find((u) => u.name === userName);
                updatedLikes[userName] = user;  // Save the entire user object
            }
            
            // Log the list of liked profiles to the console
            console.log('Liked Profiles:', Object.values(updatedLikes));

            return updatedLikes;
        });
    };

    return (
        <div className="explore-section">
            <h2>
                Saved <span className="highlight3">Roommates</span>
            </h2>
            {filteredUsers.map((user) => (
                <div className="profile-card" key={user.name}>
                    <div className="profile-image-container">
                        <img
                            src={user.image}
                            alt={user.name}
                            className="profile-image"
                        />
                    </div>
                    <div className="profile-info">
                        <div className="profile-name">{user.name}</div>
                        <div className="profile-score"><span className="highlight5">{user.rating}/5</span> Rating</div>
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
                                onClick={() => toggleLike(user.name)} // Toggle like on click
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default SavedRoommatesPage;
