import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import "./AdminPage.css";
import config from "../components/config.json";

const AdminPage = ( { onLogoutClick }) => {
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
            setUsers(data.users || []); // Assuming the API returns an object with a `users` array
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

        console.log("Deleting user with UserId:", userId, "and SortKey:", sortKey);
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
                <h2>Admin <span className="highlight3">Dashboard</span></h2>
                <h5><span className="highlight5">Manage Registered Users</span></h5>

                {loading && <p>Loading...</p>}
                {error && <p className="error-text">{error}</p>}
                
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
                                <td>{user.first_name} {user.last_name}</td>
                                <td>{user.city}</td>
                                <td>{user.state}</td>
                                <td>{user.country}</td>
                                <td>
                                    <button
                                    className="delete-user-btn"
                                    onClick={() =>
                                        handleDeleteUser(user.UserId, user["DataType#Timestamp"])
                                    }
                                    >
                                    Delete User
                                    </button>
                                </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    {/* Small Screens: Cards */}
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
                                <h5>{user.first_name} {user.last_name}</h5>
                                <p>{user.city}, {user.state}, {user.country}</p>
                            </div>
                            <p>{user.email}</p>
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
