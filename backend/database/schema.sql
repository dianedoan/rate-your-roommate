CREATE DATABASE IF NOT EXISTS app_database;
USE app_database;
-- Users Table
CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('Admin', 'User', 'Guest') DEFAULT 'User',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Profiles Table
CREATE TABLE Profiles (
    user_id INT PRIMARY KEY,
    bio TEXT NULL,
    age INT,
    location VARCHAR(100) NULL,
    cleanliness_rating TINYINT NULL,
    boundaries_rating TINYINT NULL,
    communication_rating TINYINT NULL,
    curfew_rating TINYINT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);
-- Ratings Table
CREATE TABLE Ratings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    reviewer_id INT,
    reviewed_user_id INT,
    rating TINYINT NOT NULL,
    review TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (reviewer_id) REFERENCES Users(id) ON DELETE
    SET NULL,
        FOREIGN KEY (reviewed_user_id) REFERENCES Users(id) ON DELETE
    SET NULL
);
-- Matches Table
CREATE TABLE Matches (
    user1_id INT,
    user2_id INT,
    matched_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user1_id, user2_id),
    FOREIGN KEY (user1_id) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (user2_id) REFERENCES Users(id) ON DELETE CASCADE,
    CHECK (user1_id < user2_id) -- prevents duplicate matches in different orders
);
-- Messages Table
CREATE TABLE Messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sender_id INT,
    receiver_id INT,
    message TEXT NOT NULL,
    sent_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES Users(id) ON DELETE CASCADE
);
-- Indexes
CREATE INDEX idx_email ON Users(email);
CREATE INDEX idx_user1_id ON Matches(user1_id);
CREATE INDEX idx_user2_id ON Matches(user2_id);