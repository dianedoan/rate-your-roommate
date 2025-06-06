import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import "./AdminPage.css";
import config from "../components/config.json";

const AdminPage = ({ onLogoutClick }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${config.apiBaseUrl}/get-all-users`);
        if (!response.ok) {
          throw new Error("Failed to fetch users.");
        }
        const data = await response.json();
        // Filter out the admin account
        setUsers(
          data.users?.filter(
            (user) => user.UserId !== "cef620a8-0dde-47e2-8b72-a398c40decb3"
          ) || []
        );
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Function to delete a user
  const handleDeleteUser = async (userId, sortKey) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this user?"
    );

    // console.log("Deleting user with UserId:", userId, "and SortKey:", sortKey);
    if (!confirmation) return;

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${config.apiBaseUrl}/delete-user`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ UserId: userId, SortKey: sortKey }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete user.");
      }

      // Remove the deleted user from the state
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.UserId !== userId)
      );
      alert("User deleted successfully.");
    } catch (err) {
      setError(err.message);
      alert("Failed to delete user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="general-content">
      <div className="admin-dashboard">
        <h2>
          Admin <span className="highlight3">Dashboard</span>
        </h2>

        {loading && <h3>Loading...</h3>}
        {error && <h3 className="error-text">{error}</h3>}

        <div className="table-container">
          <Table bordered className="d-none d-md-table">
            <thead>
              <tr>
                <th>Profile Image</th>
                <th>Username</th>
                <th>Email</th>
                <th>Name</th>
                <th>City</th>
                <th>State/Province</th>
                <th>Country</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.UserId}>
                  <td>
                    <img
                      src={user.profile_picture || "default-profile.png"}
                      alt={user.username}
                      className="admin-profile-pic"
                    />
                  </td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.first_name} {user.last_name}
                  </td>
                  <td>{user.city}</td>
                  <td>{user.state}</td>
                  <td>{user.country}</td>
                  <td>
                    <button
                      className="delete-user-btn"
                      onClick={() =>
                        handleDeleteUser(
                          user.UserId,
                          user["DataType#Timestamp"]
                        )
                      }
                    >
                      Delete User
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="d-block d-md-none">
            {users.map((user) => {
              return (
                <div className="user-card" key={user.id}>
                  <div className="card-header">
                    <img
                      src={user.profile_picture || "default-profile.png"}
                      alt={user.username}
                      className="admin-profile-pic"
                    />
                    <div className="admin-name">
                      {user.first_name} {user.last_name}
                    </div>
                    <div className="admin-location">
                      {user.city}, {user.state}, {user.country}
                    </div>
                  </div>
                  <div className="admin-email">{user.email}</div>
                  <div className="card-footer">
                    <button
                      className="delete-user-btn"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      Delete User
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="profile-buttons-container">
        <button className="profile-btn" onClick={onLogoutClick}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminPage;
