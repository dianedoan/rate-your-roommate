import React, { useState } from "react";
import profile1 from "../assets/images/profile-pics/profile1.jpg";
import profile2 from "../assets/images/profile-pics/profile2.jpg";
import profile3 from "../assets/images/profile-pics/profile3.jpg";
import profile4 from "../assets/images/profile-pics/profile4.jpg";
import profile5 from "../assets/images/profile-pics/profile5.jpg";
import heart2 from "../assets/images/button-icons/heart2.svg";
import heart2filled from "../assets/images/button-icons/heart2-filled.svg";
import leftarrow from "../assets/images/button-icons/left-arrow.svg";
import rightarrow from "../assets/images/button-icons/right-arrow.svg";
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
    "Bob Brown": {
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
  });

  const [activeTopRatedIndex, setActiveTopRatedIndex] = useState(0);

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
  ];

  const exploreList = [
    {
      name: "Dave Jones",
      firstName: "Dave",
      lastName: "Jones",
      city: "Airdrie",
      state: "AB",
      occupation: "Neurosurgeon",
      rating: "4.0",
      description: "I have a passion for biking",
      image: profile2,
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
      const user = [...topRatedList, ...exploreList].find(
        (u) => u.name === userName
      );
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
    setActiveTopRatedIndex((prevIndex) =>
      (prevIndex + 1) % topRatedList.length
    );
  };

  const handlePrevious = () => {
    setActiveTopRatedIndex((prevIndex) =>
      (prevIndex - 1 + topRatedList.length) % topRatedList.length
    );
  };

  return (
    <div className="homepage-content">
      <div className="top-rated-section">
        <h2>Top-Rated <span className="highlight2">Roommates</span></h2>
          <div className="top-rated-container">
            <button onClick={handlePrevious} className="navigation-button">
            <img src={leftarrow} alt="previous" className="arrow-icon" />
            </button>
              <div className="top-rated-card" key={topRatedList[activeTopRatedIndex].name}>
                <div className="profile-image-container">
                  <img
                    src={topRatedList[activeTopRatedIndex].image}
                    alt={topRatedList[activeTopRatedIndex].name}
                    className="top-rated-profile-image"
                  />
                </div>
                <div className="top-rated-profile-info">
                  <div className="top-rated-profile-name">
                    {topRatedList[activeTopRatedIndex].name}
                  </div>
                  <div className="top-rated-profile-occupation">
                    {topRatedList[activeTopRatedIndex].occupation}
                  </div>
                  <div className="top-rated-profile-description">
                    {topRatedList[activeTopRatedIndex].description}
                  </div>
                  <div className="top-rated-profile-score">
                    <span className="highlight4">
                      {topRatedList[activeTopRatedIndex].rating}/5
                    </span>{" "}
                    Rating
                  </div>
                </div>
                <div className="location-favorite-container">
                  <p className="top-rated-location">
                    {topRatedList[activeTopRatedIndex].city},{" "}
                    {topRatedList[activeTopRatedIndex].state}
                  </p>
                  <div className="favorite-icon">
                    <img
                      src={
                        likedProfiles[topRatedList[activeTopRatedIndex].name]
                          ? heart2filled
                          : heart2
                      }
                      alt="heart icon"
                      className="heart-icon"
                      onClick={() =>
                        toggleLike(topRatedList[activeTopRatedIndex].name)
                      }
                    />
                  </div>
                </div>
              </div>
            <button onClick={handleNext} className="navigation-button">
              <img src={rightarrow} alt="next" className="arrow-icon" />
            </button>
          </div>
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
              <div className="profile-score">
                <span className="highlight5">{user.rating}/5</span> Rating
              </div>
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
                  onClick={() => toggleLike(user.name)}
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
