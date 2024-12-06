import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import config from "../components/config.json";
import "./SearchPage.css";

function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Function to fetch search results from the backend
  const fetchSearchResults = async (query) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `${config.apiBaseUrl}/search?searchTerm=${encodeURIComponent(query)}`
      );
      const data = await response.json();

      if (response.ok) {
        setFilteredUsers(data.results || []);
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
                className="profile-card"
                onClick={() => navigate(`/reviews/${user.UserId}`)}
              >
                <div className="profile-info-container">
                  <div className="profile-image-container">
                    <img
                      src={
                        user.profile_picture ||
                        "https://res.cloudinary.com/djx2y175z/image/upload/v1733203679/profile0_mcl0ts.png"
                      }
                      alt={`${user.username || "User"}'s profile`}
                      className="profile-image"
                    />
                    <div className="profile-info">
                      <div className="profile-name">
                        {user.first_name} {user.last_name}
                      </div>
                      <div className="profile-score">
                        <span className="highlight5">
                          {user.AverageScore === 0
                            ? "N/A"
                            : `${user.AverageScore}/5`}
                        </span>{" "}
                        Rating
                      </div>
                      <div className="profile-occupation">
                        {user.occupation}
                      </div>
                      <div className="profile-description">
                        {user.ProfileData?.aboutMe}
                      </div>
                    </div>
                  </div>
                  <div className="profile-location">
                    {user.city}, {user.state}
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
