import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col, Badge } from 'react-bootstrap';
import profile4 from "../assets/images/profile-pics/profile4.jpg";
import heart2 from '../assets/images/button-icons/heart2.svg'; 
import heart2filled from '../assets/images/button-icons/heart2-filled.svg'; 
import "./SearchPage.css";
function SearchPage() {
    const [searchQuery, setSearchQuery] = useState(''); // Search input state
    const preferencesList = []

    return (
        <div className="search-content">
            <div className="search-bar">
                <Form.Group controlId="search" className="search-bar">
                <Form.Label></Form.Label>
                <Form.Control
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} // Update the search query
                className="mb-3"
                />
                </Form.Group>
            </div>
            <div className="search-results-container">
                <br/>
            </div>
        </div>
    );
};
  
export default SearchPage;
