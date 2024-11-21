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
import "./HomePage.css";


function SavedRoommatesPage() {
    const [searchQuery, setSearchQuery] = useState(''); // Search input state
    const savedList = [
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

    // Filter the users based on search input (name, city)
    const filteredUsers = savedList.filter((user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.state.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
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
                <img src={heart2} alt="heart2" className="heart-icon" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
}

export default SavedRoommatesPage;
