import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";
import "./AdminPage.css";

import { userList } from "../data/userData"; // Example data sources

const AdminPage = () => {
    const [users, setUsers] = useState(userList);

    // Function to delete a user
    const handleDeleteUser = (userId) => {
        const confirmation = window.confirm(
        "Are you sure you want to delete this user?"
        );
        if (confirmation) {
        const updatedUsers = users.filter((user) => user.id !== userId);
        setUsers(updatedUsers);
        }
    };

    return (
        <div className="general-content">
            <div className="admin-dashboard">
                <h2>Admin <span className="highlight3">Dashboard</span></h2>
                <h5><span className="highlight5">Manage Registered Users</span></h5>
                <div className="table-container">
                    {/* Large Screens: Table */}
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
                        {users.map((user) => {
                            return (
                            <tr key={user.id}>
                                <td>
                                <img
                                    src={user.image}
                                    alt={user.username}
                                    className="admin-profile-pic"
                                />
                                </td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>
                                {user.firstName} {user.lastName}
                                </td>
                                <td>{user.city}</td>
                                <td>{user.state}</td>
                                <td>{user.country}</td>
                                {/*  */}
                                <td>
                                <button
                                    className="delete-user-btn"
                                    onClick={() => handleDeleteUser(user.id)}
                                >
                                    Delete User
                                </button>
                                </td>
                            </tr>
                            );
                        })}
                        </tbody>
                    </Table>

                    {/* Small Screens: Cards */}
                    <div className="d-block d-md-none">
                        {users.map((user) => {
                        return (
                            <div className="user-card" key={user.id}>
                            <div className="card-header">
                                <img
                                src={user.image}
                                alt={user.username}
                                className="admin-profile-pic"
                                />
                                <h5>{user.firstName} {user.lastName}</h5>
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
        </div>
    );
};

export default AdminPage;
