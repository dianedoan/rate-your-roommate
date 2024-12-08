import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import About from "./pages/About";
import TermsConditions from "./pages/TermsConditions";
import HomePage from "./pages/HomePage";
import ReviewPage from "./pages/ReviewPage";
import CreateReviewPage from "./pages/CreateReviewPage";
import SearchPage from "./pages/SearchPage";
import UserProfilePage from "./pages/UserProfilePage";
import EditProfilePage from "./pages/EditProfilePage";
import AdminPage from "./pages/AdminPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginModal from "./components/LoginModal";
import RegisterModal from "./components/RegisterModal";
import ForgotPasswordModal from "./components/ForgotPasswordModal";
import SetupProfileModal from "./components/SetupProfileModal";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/styles/global.css";

function ProtectedRoute({ isAllowed, children, redirectTo = "/" }) {
  if (!isAllowed) {
    return <Navigate to={redirectTo} replace />;
  }
  return children;
}

function NotFound() {
  return (
    <div className="general-content">
      <h2>Page Not Found</h2>
      <h3>The page you are looking for does not exist.</h3>
    </div>
  );
}

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showSetupProfile, setShowSetupProfile] = useState(false);
  const [userId, setUserId] = useState(null);
  const [sortKey, setSortKey] = useState(null);
  const [userCity, setUsercity] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const storedSortKey = localStorage.getItem("sortKey");
    const storedCity = localStorage.getItem("userCity");
    if (storedUserId && storedSortKey && storedCity) {
      setUserId(storedUserId);
      setSortKey(storedSortKey);
      setUsercity(storedCity);
    }
  }, []);

  // Functions to toggle login/register modal
  const handleLoginClick = () => setShowLogin(true);
  const handleRegisterClick = () => setShowRegister(true);
  const handleRegisterToLoginClick = () => {
    setShowRegister(false);
    setShowLogin(true);
  };

  const handleForgotPasswordClick = () => {
    setShowForgotPassword(true);
  };

  const handleCloseLoginModal = () => setShowLogin(false);
  const handleCloseRegisterModal = () => setShowRegister(false);
  const handleCloseForgotPasswordModal = () => {
    setShowForgotPassword(false);
  };

  const handleCloseSetupProfileModal = () => setShowSetupProfile(false);

  const handleSuccessfulLogin = (response) => {
    try {
      // Debugging: log the response structure
      // console.log("Login response:", response);

      // Extract values directly from the response
      const { message, UserId, SortKey, city } = response;

      // Validate that the necessary fields exist
      if (!UserId || !SortKey || !city) {
        throw new Error("Invalid login response format.");
      }

      // Update state with extracted values
      setUserId(UserId);
      setSortKey(SortKey);
      setUsercity(city);

      // console.log(
      //   "App.js: Set UserId, SortKey, and City:",
      //   UserId,
      //   SortKey,
      //   city
      // );

      // Persist in localStorage
      localStorage.setItem("userId", UserId);
      localStorage.setItem("sortKey", SortKey);
      localStorage.setItem("userCity", city);

      setShowLogin(false);

      window.location.href = "/home";
    } catch (error) {
      // console.error("Login response error:", error.message);
      alert("Failed to log in. Please try again.");
    }
  };

  const handleSuccessRegister = (response) => {
    try {
      // Ensure the body is parsed
      const parsedBody = response.body
        ? JSON.parse(response.body) // Parse stringified body
        : response;

      // Extract UserId and SortKey from the parsed body
      const { UserId, SortKey } = parsedBody;

      // Validate the extracted values
      if (!UserId || !SortKey) {
        throw new Error("Invalid registration response format.");
      }

      // Set the values in state
      setUserId(UserId);
      setSortKey(SortKey);
      // console.log(
      //   "App.js: Set UserId and SortKey after registration:",
      //   UserId,
      //   SortKey
      // );

      // Persist in localStorage
      localStorage.setItem("userId", UserId);
      localStorage.setItem("sortKey", SortKey);

      // Open the setup profile modal
      setShowSetupProfile(true);
    } catch (error) {
      console.error("Registration response error:", error.message);
      alert("Failed to register. Please try again.");
    }
  };

  const handleLogout = () => {
    const confirmation = window.confirm("Are you sure you want to logout?");
    if (confirmation) {
      // Clear state
      setUserId(null);
      setSortKey(null);

      // Remove from localStorage
      localStorage.removeItem("userId");
      localStorage.removeItem("sortKey");
      localStorage.removeItem("userCity");

      // Navigate to the landing page
      window.location.href = "/";
    }
  };

  const handleGuestLogin = () => {
    // Navigate to the landing page
    window.location.href = "/home";
  };

  return (
    <Router>
      <Header
        onLoginClick={handleLoginClick}
        onRegisterClick={handleRegisterClick}
        userId={userId}
        sortKey={sortKey}
      />
      <Routes>
        <Route
          path="/"
          element={
            <LandingPage
              onLoginClick={handleLoginClick}
              onRegisterClick={handleRegisterClick}
              userId={userId}
            />
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute isAllowed={userCity === "admin"} redirectTo="/home">
              <AdminPage onLogoutClick={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/terms" element={<TermsConditions />} />
        <Route
          path="/home"
          element={
            <HomePage userId={userId} sortKey={sortKey} userCity={userCity} />
          }
        />
        <Route path="/reviews/:recipientId" element={<ReviewPage />} />
        <Route
          path="/create-review/:recipientId"
          element={
            <CreateReviewPage
              userId={userId}
              sortKey={sortKey}
              userCity={userCity}
            />
          }
        />
        <Route path="/search" element={<SearchPage />} />
        <Route
          path="/profile"
          element={
            <UserProfilePage
              userId={userId}
              sortKey={sortKey}
              userCity={userCity}
              onLogoutClick={handleLogout}
            />
          }
        />
        <Route
          path="/edit-profile"
          element={
            <EditProfilePage
              userId={userId}
              sortKey={sortKey}
              userCity={userCity}
            />
          }
        />
        {/* Catch-all route for undefined paths */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer onForgotPasswordClick={handleForgotPasswordClick} />
      {showLogin && (
        <LoginModal
          onClose={handleCloseLoginModal}
          onLoginSuccess={handleSuccessfulLogin}
          onForgotPasswordClick={handleForgotPasswordClick}
          onGuestLogin={handleGuestLogin}
        />
      )}
      {showRegister && (
        <RegisterModal
          onClose={handleCloseRegisterModal}
          onRegisterSuccess={handleSuccessRegister}
          onLoginClick={handleRegisterToLoginClick}
        />
      )}
      {showForgotPassword && (
        <ForgotPasswordModal
          show={showForgotPassword}
          onClose={handleCloseForgotPasswordModal}
        />
      )}
      {showSetupProfile && (
        <SetupProfileModal
          show={showSetupProfile}
          onClose={handleCloseSetupProfileModal}
          userId={userId}
          sortKey={sortKey}
          onLoginSuccess={handleSuccessfulLogin}
        />
      )}
    </Router>
  );
}

export default App;
