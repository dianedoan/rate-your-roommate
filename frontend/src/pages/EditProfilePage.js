import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Badge } from "react-bootstrap";
import edit from "../assets/images/button-icons/edit.svg";
import config from "../components/config.json";
import "./EditProfilePage.css";

const EditProfilePage = ({ userId, sortKey }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditingAboutMe, setIsEditingAboutMe] = useState(false);
  const [aboutMeText, setAboutMeText] = useState("");
  const [selectedPreferences, setSelectedPreferences] = useState([]);
  const [isEditingPreferences, setIsEditingPreferences] = useState(false);
  const [accountDetails, setAccountDetails] = useState({});
  const [isEditingAccount, setIsEditingAccount] = useState(false);

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

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          `${
            config.apiBaseUrl
          }/fetch-profile?UserId=${userId}&SortKey=${encodeURIComponent(
            sortKey
          )}`
        );
        if (!response.ok) throw new Error("Failed to fetch profile data.");

        const data = await response.json();
        setUserProfile(data);
        setAboutMeText(data?.ProfileData?.aboutMe || "");
        setSelectedPreferences(data?.ProfileData?.preferences || []);
        setAccountDetails({
          username: data.username,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          occupation: data.occupation,
          country: data.country,
          state: data.state,
          city: data.city,
        });
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch profile data.");
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId, sortKey]);

  const updateProfile = async (updatedFields) => {
    try {
      const response = await fetch(`${config.apiBaseUrl}/update-profile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          UserId: userId,
          "DataType#Timestamp": sortKey,
          ...updatedFields,
        }),
      });

      if (!response.ok) throw new Error("Failed to update profile.");

      return response.ok;
    } catch (err) {
      console.error(err);
      throw new Error(err.message || "An error occurred while updating.");
    }
  };

  const handleSaveAboutMe = async () => {
    try {
      await updateProfile({
        ProfileData: {
          aboutMe: aboutMeText,
          preferences: selectedPreferences,
        },
      });

      setUserProfile((prev) => ({
        ...prev,
        ProfileData: { ...prev.ProfileData, aboutMe: aboutMeText },
      }));
      setIsEditingAboutMe(false);
      alert("About Me updated successfully!");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleSavePreferences = async () => {
    try {
      await updateProfile({
        ProfileData: {
          aboutMe: aboutMeText,
          preferences: selectedPreferences,
        },
      });

      setUserProfile((prev) => ({
        ...prev,
        ProfileData: { ...prev.ProfileData, preferences: selectedPreferences },
      }));
      setIsEditingPreferences(false);
      alert("Preferences updated successfully!");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleSaveAccountDetails = async () => {
    try {
      await updateProfile({
        occupation: accountDetails.occupation,
        country: accountDetails.country,
        state: accountDetails.state,
        city: accountDetails.city,
      });

      alert("Account details updated successfully!");
      setIsEditingAccount(false);
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="edit-profile-content">
      <div className="edit-profile-header">
        <div className="edit-profile-image">
          <img
            src={userProfile?.image || "default-profile.png"}
            alt={`${userProfile?.firstName || "User"}'s profile`}
            className="edit-profile-image"
          />
        </div>
        <div className="edit-profile-info">
          <div className="edit-profile-name">
            {accountDetails.firstName} {accountDetails.lastName}
          </div>
          <div className="edit-profile-occupation">
            {accountDetails.occupation}
          </div>
          <div className="edit-profile-location">
            {accountDetails.city}, {accountDetails.state}
          </div>
          <Link to="/profile" className="goback-profile-btn">
            View Profile
          </Link>
        </div>
      </div>

      {/* About Me Section */}
      <div className="edit-profile-card">
        <div className="edit-profile-about-me">
          <p>
            <span className="edit-highlight">Edit </span>About Me
          </p>
          <button
            className="edit-button"
            onClick={() => setIsEditingAboutMe(!isEditingAboutMe)}
          >
            <img src={edit} alt="Edit" />
          </button>
        </div>
        {isEditingAboutMe ? (
          <div className="edit-about-me-form">
            <textarea
              className="about-me-textarea"
              value={aboutMeText}
              onChange={(e) => setAboutMeText(e.target.value)}
            />
            <div className="button-container">
              <button
                className="primary-btn save-button"
                onClick={handleSaveAboutMe}
              >
                Save
              </button>
              <button
                className="secondary-btn cancel-button"
                onClick={() => setIsEditingAboutMe(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="edit-profile-description">
            {userProfile?.ProfileData?.aboutMe || "No description provided."}
          </div>
        )}
      </div>

      {/* Preferences Section */}
      <div className="edit-profile-card">
        <div className="edit-profile-preferences">
          <p>
            <span className="edit-highlight">Edit </span>Preferences & Lifestyle
          </p>
          <button
            className="edit-button"
            onClick={() => setIsEditingPreferences(!isEditingPreferences)}
          >
            <img src={edit} alt="Edit" />
          </button>
        </div>
        {isEditingPreferences ? (
          <div className="profile-preferences">
            <div className="current-preferences">
              Current Preferences:
              <div className="selected-profile-preferences">
                {selectedPreferences.map((pref) => (
                  <Badge
                    key={pref}
                    className="selected-profile-preference-tag"
                    onClick={() =>
                      setSelectedPreferences((prev) =>
                        prev.filter((p) => p !== pref)
                      )
                    }
                  >
                    {pref}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="button-container">
              <button
                className="primary-btn save-button"
                onClick={handleSavePreferences}
              >
                Save
              </button>
              <button
                className="secondary-btn cancel-button"
                onClick={() => setIsEditingPreferences(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="selected-profile-preferences">
            {selectedPreferences.length
              ? selectedPreferences.join(", ")
              : "No preferences selected."}
          </div>
        )}
      </div>
    </div>
  );
};

export default EditProfilePage;
