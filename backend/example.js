// Example User Item
const userItem = {
    id: 'alice-wang',
    username: 'alicewang',
    email: 'alicewang@example.com',
    password: 'hashedPassword123',
    firstName: 'Alice',
    lastName: 'Wang',
    city: 'Calgary',
    state: 'AB',
    country: 'Canada',
    occupation: 'Athlete',
    description: 'I love skating and sleeping',
    imageUrl: 's3://bucket/profile1.jpg',
    preferences: ['Early Riser', 'Pet Owner', 'Clean & Tidy'],
    rating: 4.2,
    createdAt: '2024-03-20T00:00:00Z'
};

// Example Review Item
const reviewItem = {
    reviewId: 'review-1',
    userId: 'john-fitzgerald',
    authorId: 'alice-wang',
    username: 'Anonymous',
    ratings: {
        cleanliness: 3,
        communication: 3,
        timeliness: 2,
        noiseLevel: 4,
        etiquette: 2
    },
    score: 3.0,
    title: 'Too many cats',
    description: 'cat hair everywhere :(',
    yesNoAnswers: [
        { question: 'Was this roommate respectful?', answer: 'No' },
        { question: 'Would you be roommates again?', answer: 'No' }
    ],
    date: '2024-09-27'
};

// Example Message Item
const messageItem = {
    conversationId: 'alice-wang_sally-smith',
    timestamp: 1679529600000,
    sender: 'sallysmith',
    receiver: 'alicewang',
    content: 'Hey Alice!',
    userId: 'alice-wang'  // For GSI
};

// Example SavedProfile Item
const savedProfileItem = {
    userId: 'alice-wang',
    savedUserId: 'bob-brown',
    savedAt: '2024-03-20T00:00:00Z'
};