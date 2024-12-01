import React, { useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { userList, reviewsData as initialReviewsData } from '../data/userData'; // Example data sources
import './AdminPage.css'; // For custom styles, if needed

const AdminPage = () => {
    const [users, setUsers] = useState(userList);
    const [reviewsData, setReviewsData] = useState(initialReviewsData);

    // Function to delete a user
    const handleDeleteUser = (userId) => {
        const confirmation = window.confirm(
            "Are you sure you want to delete this user?"
        );
        if (confirmation) {
            const updatedUsers = users.filter((user) => user.id !== userId);
            console.log("Deleted user:", userId);
            setUsers(updatedUsers);
        } else {
            console.log("User deletion canceled.");
        }
    };

    // Delete a specific review
    const handleDeleteReview = (reviewId) => {
        const updatedReviews = reviewsData.filter((review) => review.reviewId !== reviewId);
        const confirmation = window.confirm(
            "Are you sure you want to delete this past review?"
        );
        if (confirmation) {
            setReviewsData(updatedReviews);
            console.log("Deleted review:", reviewId);
        } else {
            console.log("Review deletion canceled.");
        }
    };


    // Function to generate the star rating based on score
    const generateStarRating = (score) => {
        const filledStars = '★'.repeat(Math.floor(score));
        const halfStar = score % 1 >= 0.5 ? '½' : ''; // Check if score has a .5 and add "½" if true
        return filledStars + halfStar;
        };

    return (
        <div className="admin-dashboard">
            <h2>Admin <span className="highlight3">Dashboard</span></h2>
            <h5><span className="highlight5">Manage Registered Users</span></h5>
            <div className="table-container">
                <Table bordered>
                    <thead>
                    <tr>
                        <th>Profile Image</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Name</th>
                        <th>City</th>
                        <th>State/Province</th>
                        <th>Country</th>
                        <th>Past Reviews</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user) => {
                        // Filter reviews for the current user
                        const userReviews = reviewsData.filter(
                        (review) => review.authorId === user.id
                        );

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
                            <td>{user.firstName} {user.lastName}</td>
                            <td>{user.city}</td>
                            <td>{user.state}</td>
                            <td>{user.country}</td>
                            <td>
                            {userReviews.length > 0 ? (
                                userReviews.map((review) => (
                                <div key={review.reviewId} className="admin-user-review">
                                    <div className="review-id">
                                        <strong>Review ID:</strong> {review.reviewId}
                                    </div>
                                    <div>
                                        <strong>Score:</strong>{' '}
                                        <span className="highlight5">
                                            {review.score}/5 {generateStarRating(review.score)}
                                        </span>
                                    </div>
                                    <div>
                                        <strong>Title:</strong> {review.title}
                                    </div>
                                    <div>
                                        <strong>Description:</strong> {review.description}
                                    </div>
                                    {review.yesNoAnswers && (
                                    <div>
                                        {review.yesNoAnswers.map((item, index) => (
                                        <div key={index}>
                                            <strong>{item.question}</strong>: {item.answer}
                                        </div>
                                        ))}
                                    </div>
                                    )}
                                    <div>
                                        <strong>Date:</strong> {review.date}
                                    </div>
                                    <button 
                                        className="delete-btn"
                                        onClick={() => handleDeleteReview(review.reviewId)}
                                    >
                                        Delete
                                    </button>
                                </div>
                                ))
                            ) : (
                                <em>No reviews found</em>
                            )}
                            </td>
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
            </div>
        </div>
    );
};

export default AdminPage;
