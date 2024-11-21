import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import profile1 from "../assets/images/profile-pics/profile1.jpg";
import profile2 from "../assets/images/profile-pics/profile2.jpg";
import profile3 from "../assets/images/profile-pics/profile3.jpg";
import profile4 from "../assets/images/profile-pics/profile4.jpg";
import profile5 from "../assets/images/profile-pics/profile5.jpg";
import heart2 from '../assets/images/button-icons/heart2.svg'; 
import heart2filled from '../assets/images/button-icons/heart2-filled.svg';
import starfilled from '../assets/images/button-icons/star2-filled.svg'; 
import star2filled from '../assets/images/button-icons/star2.svg';  
import "./SearchPage.css";

function SearchPage() {
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
    
    const userList = [
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
            name: 'Dave Jones',
            firstName: 'Dave',
            lastName: 'Jones',
            city: 'Airdrie',
            state: 'AB',
            occupation: 'Neurosurgeon',
            rating: '4.0',
            description: 'I have a passion for biking',
            image: profile2
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
        {
            name: 'John Fitzgerald',
            firstName: 'John',
            lastName: 'Fitzgerald',
            city: 'Calgary',
            state: 'AB',
            occupation: 'Software Engineer',
            rating: '3.5',
            description: 'I own a lot of cats',
            image: profile4
        },
        {
            name: 'Sally Smith',
            firstName: 'Sally',
            lastName: 'Smith',
            city: 'Calgary',
            state: 'AB',
            occupation: 'Teacher',
            rating: '4.0',
            description: 'I like cooking',
            image: profile5
        },
    ];

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

    return (
        <div className="search-content">
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
                            <div key={index} className="profile-card">
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
                                            onClick={() => toggleLike(user.name)} // Toggle like on click
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
