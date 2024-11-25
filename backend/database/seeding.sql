-- Seed Users
INSERT INTO Users (username, email, password, role)
VALUES (
        'admin',
        'admin@example.com',
        SHA2('admin_password', 256),
        'Admin'
    ),
    (
        'john_dae',
        'john@example.com',
        SHA2('john_password', 256),
        'User'
    ),
    (
        'jane_way',
        'jane@example.com',
        SHA2('jane_password', 256),
        'User'
    ),
    (
        'alice_smith',
        'alice@example.com',
        SHA2('alice_password', 256),
        'User'
    ),
    (
        'bob_brown',
        'bob@example.com',
        SHA2('bob_password', 256),
        'User'
    );
-- Seed Profiles
INSERT INTO Profiles (
        user_id,
        bio,
        age,
        location,
        cleanliness_rating,
        boundaries_rating,
        communication_rating,
        curfew_rating
    )
VALUES (
        2,
        'Looking for a chill roommate.',
        25,
        'Calgary',
        4,
        5,
        3,
        2
    ),
    (
        3,
        'Prefer a quiet, clean space.',
        23,
        'Toronto',
        5,
        4,
        4,
        5
    ),
    (
        4,
        'Easy-going and organized.',
        29,
        'Vancouver',
        5,
        3,
        5,
        4
    ),
    (
        5,
        'I work from home, so I need a quiet space.',
        31,
        'Edmonton',
        3,
        4,
        4,
        3
    );
-- Seed Ratings
INSERT INTO Ratings (reviewer_id, reviewed_user_id, rating, review)
VALUES (2, 3, 4, 'Very clean and respectful.'),
    (3, 2, 3, 'Good roommate but a bit noisy.'),
    (4, 5, 5, 'Super organized and considerate.'),
    (
        5,
        4,
        4,
        'Great to live with, but a bit too talkative sometimes.'
    );
-- Seed Matches
INSERT INTO Matches (user1_id, user2_id, matched_on)
VALUES (2, 3, NOW()),
    (4, 5, NOW());
-- Seed Messages
INSERT INTO Messages (sender_id, receiver_id, message)
VALUES (2, 3, 'Hey! Excited to be roommates!'),
    (
        3,
        2,
        'Same here! Let’s discuss move-in details.'
    ),
    (
        4,
        5,
        'Hello! Looking forward to living with you.'
    ),
    (
        5,
        4,
        'Me too! Let’s meet to go over some house rules.'
    );