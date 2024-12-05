import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import heart2 from '../assets/images/button-icons/heart2.svg';
import heart2filled from '../assets/images/button-icons/heart2-filled.svg';
import config from "../components/config.json";
import './SearchPage.css';

function SearchPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    // const [likedProfiles, setLikedProfiles] = useState([]);

    const { UserId } = useParams();
    const navigate = useNavigate();

    // Function to fetch search results from the backend
    const fetchSearchResults = async (query) => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch(`${config.apiBaseUrl}/search?searchTerm=${encodeURIComponent(query)}`);
            const data = await response.json();

            if (response.ok) {
                setFilteredUsers(data.results || []);
            } else {
                setFilteredUsers([]);
                setError(data.message || 'Error fetching results.');
            }
        } catch (err) {
            setError('An error occurred while fetching search results.');
        } finally {
            setLoading(false);
        }
    };

    // Handle search query changes
    useEffect(() => {
        if (searchQuery.trim() !== '') {
            fetchSearchResults(searchQuery);
        } else {
            setFilteredUsers([]);
        }
    }, [searchQuery]);

    // const toggleLike = (userName) => {
    //     setLikedProfiles((prevLikes) => {
    //         const updatedLikes = [...prevLikes];
    //         if (updatedLikes.includes(userName)) {
    //             const index = updatedLikes.indexOf(userName);
    //             updatedLikes.splice(index, 1);
    //         } else {
    //             updatedLikes.push(userName);
    //         }
    //         return updatedLikes;
    //     });
    // };

    return (
        <div className="general-content">
            <h2>Search</h2>
            <div className="search-results">
                <Form.Group controlId="search" className="search-bar">
                    <Form.Control
                        type="text"
                        placeholder="Search by name, state/province, or city"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="mb-3"
                    />
                </Form.Group>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p className="error">{error}</p>
                ) : filteredUsers.length > 0 ? (
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
                                            src={user.profile_picture}
                                            alt={user.username}
                                            className="profile-image"
                                        />
                                        <div className="profile-info">
                                            <div className="profile-name">{user.first_name} {user.last_name}</div>
                                            <div className="profile-score">
                                                <span className="highlight5">
                                                    {user.Score === 0 ? "N/A" : `${user.rating}/5`}
                                                </span>{" "}
                                                Rating
                                            </div>
                                            <div className="profile-occupation">{user.occupation}</div>
                                            <div className="profile-description">{user.ProfileData?.aboutMe}</div>
                                        </div>
                                    </div>
                                    <div className="profile-location">{user.city}, {user.state}</div>
                                    {/* <div className="favorite-icon">
                                        <img
                                        src={likedProfiles.includes(user.username) ? heart2filled : heart2}
                                        alt="heart icon"
                                        className="heart-icon"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleLike(user.username);
                                            }}
                                            />
                                    </div> */}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <h3>No results found.</h3>
                )}
            </div>
        </div>
    );
}

export default SearchPage;
