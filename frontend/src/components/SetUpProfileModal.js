// SetUpProfileModal.js
import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col, Badge } from 'react-bootstrap';
import './SetUpProfileModal.css';

function SetUpProfileModal({ show, onClose }) {
  const [aboutMe, setAboutMe] = useState('');
  const [occupation, setOccupation] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [preferences, setPreferences] = useState([]);
  const [activeBadges, setActiveBadges] = useState({});

//   const handlePreferenceClick = (preference) => {
//     if (preferences.includes(preference)) {
//       setPreferences(preferences.filter((p) => p !== preference));
//     } else {
//       setPreferences([...preferences, preference]);
//     }
//   };

  const handleBadgeClick = (badge) => {
    setActiveBadges((prevState) => ({
      ...prevState,
      [badge]: !prevState[badge],
    }));
  }

  return (
    <Modal show={show} onHide={onClose} centered className="setup-profile-modal">
      <Modal.Header closeButton>
        <Modal.Title>Setup Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="aboutMe">
            <Form.Label>About me</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              placeholder="Tell us about yourself"
              value={aboutMe}
              onChange={(e) => setAboutMe(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="occupation">
            <Form.Label>Occupation</Form.Label>
            <Form.Control
              type="text"
              placeholder="Your occupation"
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
            />
          </Form.Group>

          <Row>
            <Col>
              <Form.Group controlId="country">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  as="select"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <option>Choose...</option>
                  <option>Canada</option>
                  <option>USA</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="state">
                <Form.Label>State/Province</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="State/Province"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="city">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group controlId="preferences">
            <Form.Label>Preferences & Lifestyle</Form.Label>
            <div className="preferences-badges">
              {['Organized', 'Tidy', 'Pet Owner', 'Morning Person', 'Non-smoker', 'Age 18-24'].map((badge) => (
                <Badge
                  key={badge}
                  className="preference-badge" // No active class
                  onClick={() => console.log(`${badge} badge clicked`)} // Debugging click event
                //   className={`preference-badge ${activeBadges[badge] ? "active" : ""}`}
                //   onClick={() => handleBadgeClick(badge)}
                >
                  {badge}
                </Badge>
              ))}
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onClose}>
          Finish
        </Button>
        <Button variant="secondary" onClick={onClose}>
          Skip
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SetUpProfileModal;
