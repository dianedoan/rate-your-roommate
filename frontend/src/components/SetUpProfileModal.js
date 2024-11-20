// SetUpProfileModal.js
import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col, Badge } from 'react-bootstrap';
import { FaChevronDown } from "react-icons/fa"; // Import the down arrow icon
import './Modal.css';
import './SetupProfileModal.css';

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
        <Modal.Title className="w-100 text-center">
          <div className="modal-title-main">Setup Profile</div>
          <div className="modal-title-sub">Personalize your profile now or later</div>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group controlId="aboutMe" className="form-subtitle">
            <Form.Label>About me</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              placeholder="Tell us about yourself"
              value={aboutMe}
              onChange={(e) => setAboutMe(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="occupation" className="mt-3">
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
              <Form.Group controlId="country" className="mt-3">
                <Form.Label>Country</Form.Label>
                <div className="icon-container">
                <Form.Control
                  as="select"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <option>Choose...</option>
                  <option>Canada</option>
                  <option>USA</option>
                </Form.Control>
                <FaChevronDown className="dropdown-icon" />
                </div>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="state" className="mt-3">
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
              <Form.Group controlId="city" className="mt-3">
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

          <Form.Group controlId="preferences" className="mt-3">
            <Form.Label>Preferences & Lifestyle</Form.Label>
            <div className="preferences">
              {[
                'Age 18-24', 
                'Age 25-34', 
                'Age 35-44',

                'Early Riser', 
                'Late Sleeper', 
                'Snorer', 

                'Pet Owner', 
                'No Pets', 
                'Allergic to Pets',

                'Clean & Tidy',
                'Messy',
                'Organized', 
                'Unorganized', 

                'Likes Socializing',
                'Prefers Quiet Spaces',
                
                'Homebody',
                'Goes Out Often',
                'Travels Often',
                'Works from Home',

                'Smoker Friendly',
                'Non-Smoker',

                'Vegetarian',
                'Vegan',
                'Pescatarian',
                'Non-Vegetarian',

                'Bookworm',
                'Fitness Enthusiast',
                'Gamer'

              ].map((badge) => (
                <Badge
                  key={badge}
                  className={`preference-tag ${
                    badge.includes('Age') ? 'age-related' :
                    (badge === 'Early Riser' || badge === 'Late Sleeper' || badge === 'Snorer') ? 'sleep-related' :
                    (badge === 'Pet Owner' || badge === 'No Pets' || badge === 'Allergic to Pets') ? 'pet-related' :
                    (badge === 'Clean & Tidy' || badge === 'Messy') ? 'cleanliness-related' :
                    (badge === 'Organized' || badge === 'Unorganized') ? 'organize-related' :
                    (badge === 'Likes Socializing' || badge === 'Prefers Quiet Spaces') ? 'social-related' :
                    (badge === 'Homebody' || badge === 'Goes Out Often' || badge === 'Travels Often' || badge === 'Works from Home') ? 'lifestyle-related' :
                    (badge === 'Smoker Friendly' || badge === 'Non-Smoker') ? 'smoking-related' :
                    (badge === 'Vegetarian' || badge === 'Vegan' || badge === 'Pescatarian' || badge === 'Non-Vegetarian') ? 'diet-related' :
                    (badge === 'Bookworm' || badge === 'Gamer' || badge === 'Fitness Enthusiast') ? 'hobby-related' : ''
                  }`}
                  onClick={() => console.log(`${badge} badge clicked`)} // Debugging click event
                >
                  {badge}
                </Badge>
              ))}
            </div>
          </Form.Group>
        <div className="button-container">
          <Button variant="primary" type="submit" onClick={onClose} className="w-100 mt-3">
            Finish
          </Button>
          <Button variant="secondary" type="submit" onClick={onClose} className="w-100 mt-3">
            Skip
          </Button>
        </div>
        </Form>
      </Modal.Body>
      {/* <Modal.Footer>
      </Modal.Footer> */}
    </Modal>
  );
}

export default SetUpProfileModal;
