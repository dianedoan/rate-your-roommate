import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col, Badge } from "react-bootstrap";
import { FaChevronDown, FaTimes } from "react-icons/fa";
import "./Modal.css";
import "./SetupProfileModal.css";
import config from "./config.json";

function SetUpProfileModal({ show, onClose, userId, sortKey, onLoginSuccess }) {
  const [aboutMe, setAboutMe] = useState("");
  const [occupation, setOccupation] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPreferences, setSelectedPreferences] = useState([]);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userCity, setUsercity] = useState(null);

  useEffect(() => {
    const storedCity = localStorage.getItem("userCity");
    if (storedCity) {
      setUsercity(storedCity);
    }
  }, []);

  const preferencesList = [
    "Age 18-24",
    "Age 25-34",
    "Age 35-44",
    "Early Riser",
    "Late Sleeper",
    "Snores",
    "Pet Owner",
    "No Pets",
    "Allergic to Pets",
    "Clean & Tidy",
    "Messy",
    "Organized",
    "Unorganized",
    "Likes Socializing",
    "Prefers Quiet Spaces",
    "Homebody",
    "Goes Out Often",
    "Travels Often",
    "Works from Home",
    "Smoker Friendly",
    "Non-Smoker",
    "Vegetarian",
    "Vegan",
    "Pescatarian",
    "Non-Vegetarian",
    "Bookworm",
    "Fitness Enthusiast",
    "Gamer",
  ];

  const filteredPreferences = preferencesList.filter(
    (pref) =>
      pref.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !selectedPreferences.includes(pref)
  );

  const handleBadgeClick = (pref) => {
    if (selectedPreferences.includes(pref)) {
      setSelectedPreferences((prevState) =>
        prevState.filter((item) => item !== pref)
      );
    } else {
      setSelectedPreferences((prevState) => [...prevState, pref]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (!country || !state || !city) {
      setError("Country, State/Province, and City are required.");
      setIsSubmitting(false);
      return;
    }

    const profileData = {
      UserId: userId,
      "DataType#Timestamp": sortKey,
      aboutMe,
      occupation,
      country,
      state,
      city,
      preferences: selectedPreferences,
    };

    try {
      const response = await fetch(`${config.apiBaseUrl}/setup-profile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileData),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Failed to set up profile.");
      } else {
        const { message, userId, city } = result;
        console.log("City updated:", city);
      }
      setUsercity(city);
      localStorage.setItem("userCity", city);
      console.log("Profile setup successful:", result);
      onClose(); // Close the modal after successful submission
      window.location.href = "/home"; // Navigate to the homepage
    } catch (error) {
      console.error("Error setting up profile:", error);
      setError(error.message || "An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      show={show}
      onHide={onClose}
      centered
      className="setup-profile-modal"
      backdrop="static"
    >
      <Modal.Header>
        <Modal.Title className="w-100 text-center">
          <div className="modal-title-main">Setup Profile</div>
          <div className="modal-title-sub">Personalize your profile</div>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
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
                    <option disabled value="">
                      Select...
                    </option>
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
            <Form.Control
              type="text"
              placeholder="Search for tags (e.g., age, pet, clean)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mb-3"
            />
            <div className="preferences">
              {filteredPreferences.length > 0 ? (
                filteredPreferences.map((pref) => (
                  <Badge
                    key={pref}
                    className={`preference-tag ${
                      pref === "Age 18-24" ||
                      pref === "Age 25-34" ||
                      pref === "Age 35-44"
                        ? "age-related"
                        : pref === "Early Riser" ||
                          pref === "Late Sleeper" ||
                          pref === "Snores"
                        ? "sleep-related"
                        : pref === "Pet Owner" ||
                          pref === "No Pets" ||
                          pref === "Allergic to Pets"
                        ? "pet-related"
                        : pref === "Clean & Tidy" || pref === "Messy"
                        ? "cleanliness-related"
                        : pref === "Organized" || pref === "Unorganized"
                        ? "organize-related"
                        : pref === "Likes Socializing" ||
                          pref === "Prefers Quiet Spaces"
                        ? "social-related"
                        : pref === "Homebody" ||
                          pref === "Goes Out Often" ||
                          pref === "Travels Often" ||
                          pref === "Works from Home"
                        ? "lifestyle-related"
                        : pref === "Smoker Friendly" || pref === "Non-Smoker"
                        ? "smoking-related"
                        : pref === "Vegetarian" ||
                          pref === "Vegan" ||
                          pref === "Pescatarian" ||
                          pref === "Non-Vegetarian"
                        ? "diet-related"
                        : pref === "Bookworm" ||
                          pref === "Gamer" ||
                          pref === "Fitness Enthusiast"
                        ? "hobby-related"
                        : ""
                    }`}
                    onClick={() => handleBadgeClick(pref)}
                    style={{ cursor: "pointer" }}
                  >
                    {pref}
                  </Badge>
                ))
              ) : (
                <p>No preference tags found.</p>
              )}
            </div>
          </Form.Group>

          <Form.Group controlId="selectedPreferences" className="mt-3">
            <Form.Label>Selected Preferences</Form.Label>
            <div className="selected-preferences">
              {selectedPreferences.map((pref) => (
                <Badge
                  key={pref}
                  className={`selected-preference-tag ${
                    pref === "Age 18-24" ||
                    pref === "Age 25-34" ||
                    pref === "Age 35-44"
                      ? "age-related"
                      : pref === "Early Riser" ||
                        pref === "Late Sleeper" ||
                        pref === "Snores"
                      ? "sleep-related"
                      : pref === "Pet Owner" ||
                        pref === "No Pets" ||
                        pref === "Allergic to Pets"
                      ? "pet-related"
                      : pref === "Clean & Tidy" || pref === "Messy"
                      ? "cleanliness-related"
                      : pref === "Organized" || pref === "Unorganized"
                      ? "organize-related"
                      : pref === "Likes Socializing" ||
                        pref === "Prefers Quiet Spaces"
                      ? "social-related"
                      : pref === "Homebody" ||
                        pref === "Goes Out Often" ||
                        pref === "Travels Often" ||
                        pref === "Works from Home"
                      ? "lifestyle-related"
                      : pref === "Smoker Friendly" || pref === "Non-Smoker"
                      ? "smoking-related"
                      : pref === "Vegetarian" ||
                        pref === "Vegan" ||
                        pref === "Pescatarian" ||
                        pref === "Non-Vegetarian"
                      ? "diet-related"
                      : pref === "Bookworm" ||
                        pref === "Gamer" ||
                        pref === "Fitness Enthusiast"
                      ? "hobby-related"
                      : ""
                  }`}
                  onClick={() => handleBadgeClick(pref)}
                >
                  {pref}
                  <FaTimes style={{ marginLeft: "5px" }} />
                </Badge>
              ))}
            </div>
          </Form.Group>

          {error && <p className="modal-error-message">{error}</p>}

          <div>
            <Button
              variant="primary"
              type="submit"
              className="w-100 mt-3"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Finish"}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default SetUpProfileModal;
