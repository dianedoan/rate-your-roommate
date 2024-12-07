import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import config from "../components/config.json";
import "./SearchPage.css";

// Function to calculate average rating
const calculateAverageRating = (userId) => {
  const userReviews = reviewsData.filter((review) => review.userId === userId);
  const totalScore = userReviews.reduce(
    (acc, review) => acc + parseFloat(review.score),
    0
  );
  const averageRating = totalScore / userReviews.length;
  return averageRating ? Math.round(averageRating * 10) / 10 : 0; // Round to 1 decimal place
};

function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

// Function to fetch search results
const fetchSearchResults = async (query) => {
  setLoading(true);
  setError("");
  try {
    const response = await fetch(
      `${config.apiBaseUrl}/search?searchTerm=${encodeURIComponent(query)}`
    );
    const data = await response.json();

    if (response.ok) {
      // Filter out the user with the specified userId
      const filtered = data.results.filter((user) => user.UserId !== 'cef620a8-0dde-47e2-8b72-a398c40decb3');
      setFilteredUsers(filtered);
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

  // Handle search query changes
  useEffect(() => {
    if (searchQuery.trim() !== "") {
      fetchSearchResults(searchQuery);
    } else {
      setFilteredUsers([]);
    }
  }, [searchQuery]);

  return (
    <div className="general-content">
      <h2>Search</h2>
      <div className="search-results">
        <Form.Group controlId="search" className="search-bar">
          <Form.Control
            type="text"
            placeholder="Search by name or city"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mb-3"
          />
        </Form.Group>
        {loading ? (
          <div className="general-content">
            <h3>Loading...</h3>
          </div>
        ) : error ? (
          <div className="general-content">
            <h3>Error: {error}</h3>
          </div>
        ) : searchQuery.trim() !== "" && filteredUsers.length === 0 ? (
          <h3>No results found.</h3>
        ) : (
          <div className="search-results">
            {filteredUsers.map((user) => (
              <div
                key={user.username}
                className="review-card"
                onClick={() => navigate(`/reviews/${user.UserId}`)}
              >
                <div className="profile-container">
                  <img
                    src={
                      user.profile_picture ||
                      "https://res.cloudinary.com/djx2y175z/image/upload/v1733203679/profile0_mcl0ts.png"
                    }
                    alt={`${user.username || "User"}'s profile`}
                    className="profile-image"
                  />
                  <div className="profile-info">
                    <div className="profile-date-location">
                      <div className="review-score">
                        {user.first_name} {user.last_name}
                      </div>
                      <div className="review-description">
                        {user.city}, {user.state}
                      </div>
                    </div>
                    <div className="review-score">
                      <span className="highlight5">
                        {user.AverageScore === 0
                          ? "N/A"
                          : `${user.AverageScore.toFixed(1)}/5`}
                      </span>{" "}
                      Rating
                    </div>

                    <div className="review-date">{user.occupation}</div>
                    <div className="review-description">
                      {user.ProfileData?.aboutMe}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
