import React, { useState } from "react";
import profile1 from "../assets/images/profile-pics/profile1.jpg";
import profile2 from "../assets/images/profile-pics/profile2.jpg";
import profile3 from "../assets/images/profile-pics/profile3.jpg";
import profile4 from "../assets/images/profile-pics/profile4.jpg";
import profile5 from "../assets/images/profile-pics/profile5.jpg";
import heart2 from "../assets/images/button-icons/heart2.svg";
import heart2filled from "../assets/images/button-icons/heart2-filled.svg";
import starfilled from "../assets/images/button-icons/star2-filled.svg";
import star2filled from "../assets/images/button-icons/star2.svg";
import "./HomePage.css";

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [likedProfiles, setLikedProfiles] = useState({
    "Alice Wang": {
      name: "Alice Wang",
      firstName: "Alice",
      lastName: "Wang",
      city: "Calgary",
      state: "AB",
      occupation: "Athlete",
      rating: "4.5",
      description: "I love skating and sleeping",
      image: profile1,
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

  const topRatedList = [
    {
      name: "Alice Wang",
      firstName: "Alice",
      lastName: "Wang",
      city: "Calgary",
      state: "AB",
      occupation: "Athlete",
      rating: "4.5",
      description: "I love skating and sleeping",
      image: profile1,
    },
  ];

  const exploreList = [
    {
      name: "Dave Jones",
      firstName: "Dave",
      lastName: "Jones",
      city: "Airdrie",
      state: "AB",
      occupation: "Software Engineer",
      rating: "4.0",
      description: "I have a passion for biking",
      image: profile2,
    },
    {
      name: "Bob Brown",
      firstName: "Bob",
      lastName: "Brown",
      city: "Calgary",
      state: "AB",
      occupation: "Student",
      rating: "4.0",
      description: "NEED a roommate ASAP",
      image: profile3,
    },
    {
      name: "John Fitzgerald",
      firstName: "John",
      lastName: "Fitzgerald",
      city: "Calgary",
      state: "AB",
      occupation: "Software Engineer",
      rating: "3.5",
      description: "I own a lot of cats",
      image: profile4,
    },
    {
      name: "Sally Smith",
      firstName: "Sally",
      lastName: "Smith",
      city: "Calgary",
      state: "AB",
      occupation: "Teacher",
      rating: "4.0",
      description: "I like cooking",
      image: profile5,
    },
  ];

  // Filter users based on the search query
  const filteredUsers = exploreList.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.state.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleLike = (userName) => {
    setLikedProfiles((prevLikes) => {
      // Find the user object from either topRatedList or exploreList
      const user =
        [...topRatedList, ...exploreList].find((u) => u.name === userName);

      // If the user doesn't exist, do nothing
      if (!user) return prevLikes;

      const updatedLikes = { ...prevLikes };

      if (updatedLikes[userName]) {
        // If already liked, remove from the saved profiles
        delete updatedLikes[userName];
      } else {
        // If not liked yet, add to the saved profiles
        updatedLikes[userName] = user;  // Save the entire user object
      }

      // Log the list of liked profiles to the console
      console.log('Liked Profiles:', Object.values(updatedLikes));

      return updatedLikes;
    });
  };

  return (
    <div className="homepage-content">
      <div className="top-rated-section">
        <h2>
          Top-Rated <span className="highlight2">Roommates</span>
        </h2>
        {topRatedList.map((user) => (
          <div className="top-rated-card" key={user.name}>
            <div className="profile-image-container">
              <img
                src={user.image}
                alt={user.name}
                className="top-rated-profile-image"
              />
            </div>
            <div className="top-rated-profile-info">
              <div className="top-rated-profile-name">{user.name}</div>
              <div className="top-rated-profile-occupation">
                {user.occupation}
              </div>
              <div className="top-rated-profile-description">
                {user.description}
              </div>
              <div className="profile-score">
                <span className="highlight4">{user.rating}/5</span> Rating
              </div>
            </div>
            <div className="location-favorite-container">
              <p className="top-rated-location">
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

      <div className="explore-section">
        <h2>
          Explore <span className="highlight3">Roommates</span>
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
    </div>
  );
};

export default HomePage;
