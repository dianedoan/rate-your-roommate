import profile1 from "../assets/images/profile-pics/profile1.jpg";
import profile2 from "../assets/images/profile-pics/profile2.jpg";
import profile3 from "../assets/images/profile-pics/profile3.jpg";
import profile4 from "../assets/images/profile-pics/profile4.jpg";
import profile5 from "../assets/images/profile-pics/profile5.jpg";

// Centralized list of all registered users
export const userList = [
    {
        id: 'alice-wang',
        username: 'alicewang',
        password: '123456',
        name: 'Alice Wang',
        firstName: 'Alice',
        lastName: 'Wang',
        city: 'Calgary',
        state: 'AB',
        country: 'Canada',
        occupation: 'Athlete',
        description: 'I love skating and sleeping',
        image: profile1,
        preferences: ['Early Riser', 'Pet Owner', 'Clean & Tidy', 'Likes Socializing', 'Vegetarian'],
        email: 'alicewang@example.com'
    },
    {
        id: 'dave-jones',
        username: 'davejones',
        password: '123456',
        name: 'Dave Jones',
        firstName: 'Dave',
        lastName: 'Jones',
        city: 'Airdrie',
        state: 'AB',
        country: 'Canada',
        occupation: 'Neurosurgeon',
        description: 'I have a passion for biking',
        image: profile2,
        preferences: ['Late Sleeper', 'Smoker Friendly', 'Fitness Enthusiast', 'Non-Vegetarian'],
        email: 'davejones@example.com'
    },
    {
        id: 'bob-brown',
        username: 'bobbrown',
        password: '123456',
        name: 'Bob Brown',
        firstName: 'Bob',
        lastName: 'Brown',
        city: 'Calgary',
        state: 'AB',
        country: 'Canada',
        occupation: 'Student',
        description: 'NEED a roommate ASAP',
        image: profile3,
        preferences: ['Messy', 'Organized', 'Homebody', 'Non-Smoker'],
        email: 'bobbrown@example.com'
    },
    {
        id: 'john-fitzgerald',
        username: 'johnfitz',
        password: '123456',
        name: 'John Fitzgerald',
        firstName: 'John',
        lastName: 'Fitzgerald',
        city: 'Calgary',
        state: 'AB',
        country: 'Canada',
        occupation: 'Software Engineer',
        description: 'I own a lot of cats',
        image: profile4,
        preferences: ['Pet Owner', 'Smoker Friendly', 'Goes Out Often', 'Vegetarian'],
        email: 'johnfitzgerald@example.com'
    },
    {
        id: 'sally-smith',
        username: 'sallysmith',
        password: '123456',
        name: 'Sally Smith',
        firstName: 'Sally',
        lastName: 'Smith',
        city: 'Calgary',
        state: 'AB',
        country: 'Canada',
        occupation: 'Teacher',
        description: 'I like cooking',
        image: profile5,
        preferences: ['Clean & Tidy', 'Organized', 'Likes Socializing', 'Vegan'],
        email: 'sallysmith@example.com'
    },
];

export const reviewsData = [
    {
        reviewId: 'review-1',
        userId: 'john-fitzgerald',
        authorId: 'alice-wang',
        username: 'Anonymous',
        ratings: {
            cleanliness: 3,
            communication: 3,
            timeliness: 2,
            noiseLevel: 4,
            etiquette: 2,
        },
        score: 3.0,
        title: 'Too many cats',
        description: 'cat hair everywhere :(',
        yesNoAnswers: [
            { question: 'Was this roommate respectful of your space?', answer: 'No' },
            { question: 'Was this roommate punctual with paying their living fees?', answer: 'Yes' },
            { question: 'Would you be roommates again?', answer: 'No' }
        ],
        date: '09/27/2024',
    },
    {
        reviewId: 'review-2',
        userId: 'alice-wang',
        authorId: 'john-fitzgerald',
        username: 'johnfitz', 
        ratings: {
            cleanliness: 4,
            communication: 4,
            timeliness: 5,
            noiseLevel: 3,
            etiquette: 5,
        },
        score: 4.2,
        title: 'Good roommate',
        description: 'Great cook, very respectful.',
        yesNoAnswers: [
            { question: 'Was this roommate respectful of your space?', answer: 'Yes' },
            { question: 'Was this roommate punctual with paying their living fees?', answer: 'Yes' },
            { question: 'Would you be roommates again?', answer: 'Yes' }
        ],
        date: '10/02/2024',
    },
    {
        reviewId: 'review-3',
        userId: 'alice-wang',
        authorId: 'bob-brown',
        username: 'Anonymous',
        ratings: {
            cleanliness: 4,
            communication: 5,
            timeliness: 4,
            noiseLevel: 3,
            etiquette: 4,
        },
        score: 4.2,
        title: 'Fun to live with!',
        description: 'Alice is super chill and great to hang out with. Highly recommend!',
        yesNoAnswers: [
            { question: 'Was this roommate respectful of your space?', answer: 'Yes' },
            { question: 'Was this roommate punctual with paying their living fees?', answer: 'Yes' },
            { question: 'Would you be roommates again?', answer: 'Yes' }
        ],
        date: '11/12/2024',
    },
    {
        reviewId: 'review-4',
        userId: 'dave-jones',
        authorId: 'sally-smith',
        username: 'sallysmith',
        ratings: {
            cleanliness: 5,
            communication: 5,
            timeliness: 5,
            noiseLevel: 2,
            etiquette: 5,
        },
        score: 4.4,
        title: 'Fantastic roommate',
        description: 'Dave is super clean and always respectful of shared spaces.',
        yesNoAnswers: [
            { question: 'Was this roommate respectful of your space?', answer: 'Yes' },
            { question: 'Was this roommate punctual with paying their living fees?', answer: 'Yes' },
            { question: 'Would you be roommates again?', answer: 'Yes' }
        ],
        date: '08/18/2024',
    },
    {
        reviewId: 'review-5',
        userId: 'bob-brown',
        authorId: 'alice-wang',
        username: 'Anonymous',
        ratings: {
            cleanliness: 2,
            communication: 3,
            timeliness: 3,
            noiseLevel: 4,
            etiquette: 2,
        },
        score: 2.8,
        title: 'Messy and noisy',
        description: 'Bob often left dishes unwashed and played music loudly late at night.',
        yesNoAnswers: [
            { question: 'Was this roommate respectful of your space?', answer: 'No' },
            { question: 'Was this roommate punctual with paying their living fees?', answer: 'No' },
            { question: 'Would you be roommates again?', answer: 'No' }
        ],
        date: '10/08/2024',
    },
    {
        reviewId: 'review-6',
        userId: 'alice-wang',
        authorId: 'dave-jones',
        username: 'davejones',
        ratings: {
            cleanliness: 5,
            communication: 5,
            timeliness: 5,
            noiseLevel: 3,
            etiquette: 5,
        },
        score: 4.6,
        title: 'Amazing experience!',
        description: 'Alice was the best roommate I’ve ever had. Very considerate and fun!',
        yesNoAnswers: [
            { question: 'Was this roommate respectful of your space?', answer: 'Yes' },
            { question: 'Was this roommate punctual with paying their living fees?', answer: 'Yes' },
            { question: 'Would you be roommates again?', answer: 'Yes' }
        ],
        date: '07/05/2024',
    },
    {
        reviewId: 'review-7',
        userId: 'john-fitzgerald',
        authorId: 'bob-brown',
        username: 'bobbrown',
        ratings: {
            cleanliness: 2,
            communication: 3,
            timeliness: 3,
            noiseLevel: 4,
            etiquette: 2,
        },
        score: 2.8,
        title: 'Not ideal',
        description: 'While John was kind, the cats made the place smell bad and unlivable.',
        yesNoAnswers: [
            { question: 'Was this roommate respectful of your space?', answer: 'No' },
            { question: 'Was this roommate punctual with paying their living fees?', answer: 'Yes' },
            { question: 'Would you be roommates again?', answer: 'No' }
        ],
        date: '09/30/2024',
    },
    {
        reviewId: 'review-8',
        userId: 'alice-wang',
        authorId: 'john-fitzgerald',
        username: 'johnfitz',
        ratings: {
            cleanliness: 4,
            communication: 5,
            timeliness: 4,
            noiseLevel: 3,
            etiquette: 5,
        },
        score: 4.2,
        title: 'Wonderful roommate',
        description: 'Sally always respected my privacy and shared her amazing meals!',
        yesNoAnswers: [
            { question: 'Was this roommate respectful of your space?', answer: 'Yes' },
            { question: 'Was this roommate punctual with paying their living fees?', answer: 'Yes' },
            { question: 'Would you be roommates again?', answer: 'Yes' }
        ],
        date: '06/20/2024',
    },
    {
        reviewId: 'review-9',
        userId: 'bob-brown',
        authorId: 'alice-wang',
        username: 'alicewang',
        ratings: {
            cleanliness: 3,
            communication: 3,
            timeliness: 2,
            noiseLevel: 4,
            etiquette: 3,
        },
        score: 3.0,
        title: 'Roommate with potential',
        description: 'Bob was okay, but his habits could use some improvement.',
        yesNoAnswers: [
            { question: 'Was this roommate respectful of your space?', answer: 'Yes' },
            { question: 'Was this roommate punctual with paying their living fees?', answer: 'No' },
            { question: 'Would you be roommates again?', answer: 'No' }
        ],
        date: '05/15/2024',
    },
    {
        reviewId: 'review-10',
        userId: 'dave-jones',
        authorId: 'alice-wang',
        username: 'alicewang',
        ratings: {
            cleanliness: 5,
            communication: 5,
            timeliness: 5,
            noiseLevel: 2,
            etiquette: 5,
        },
        score: 4.6,
        title: 'Best roommate ever',
        description: 'Dave is incredibly organized and always on time with bills.',
        yesNoAnswers: [
            { question: 'Was this roommate respectful of your space?', answer: 'Yes' },
            { question: 'Was this roommate punctual with paying their living fees?', answer: 'Yes' },
            { question: 'Would you be roommates again?', answer: 'Yes' }
        ],
        date: '12/01/2024',
    },
    {
        reviewId: 'review-11',
        userId: 'john-fitzgerald',
        authorId: 'bob-brown',
        username: 'bobbrown',
        ratings: {
            cleanliness: 3,
            communication: 4,
            timeliness: 3,
            noiseLevel: 5,
            etiquette: 3,
        },
        score: 3.6,
        title: 'Not for everyone',
        description: 'Great person, but didn’t respect personal space as much as I would have liked.',
        yesNoAnswers: [
            { question: 'Was this roommate respectful of your space?', answer: 'No' },
            { question: 'Was this roommate punctual with paying their living fees?', answer: 'Yes' },
            { question: 'Would you be roommates again?', answer: 'No' }
        ],
        date: '10/18/2024',
    },
    {
        reviewId: 'review-12',
        userId: 'alice-wang',
        authorId: 'john-fitzgerald',
        username: 'johnfitz',
        ratings: {
            cleanliness: 5,
            communication: 4,
            timeliness: 5,
            noiseLevel: 3,
            etiquette: 5,
        },
        score: 4.6,
        title: 'Perfect roommate',
        description: 'Alice was always courteous and kept everything in order.',
        yesNoAnswers: [
            { question: 'Was this roommate respectful of your space?', answer: 'Yes' },
            { question: 'Was this roommate punctual with paying their living fees?', answer: 'Yes' },
            { question: 'Would you be roommates again?', answer: 'Yes' }
        ],
        date: '08/25/2024',
    },
];

export const messagesData = [
    {
        userId: 'alice-wang',
        conversation: [
            { sender: 'sallysmith', content: 'Hey Alice!' },
            { sender: 'alicewang', content: 'Hi Sally!' },
            { sender: 'sallysmith', content: 'How\'s it going?' },
            { sender: 'alicewang', content: 'Good, thanks!' }
        ]
    },
    {
        userId: 'dave-jones',
        conversation: [
            { sender: 'sallysmith', content: 'Hey Dave!' },
            { sender: 'davejones', content: 'Hello Sally!' },
            { sender: 'sallysmith', content: 'What\'s new?' },
            { sender: 'davejones', content: 'Not much, you?' }
        ]
    },
];

// Set initial liked/saved profiles
export const getInitialLikedProfiles = () => {
    return {
        // "Alice Wang": userListWithRatings.find(user => user.name === "Alice Wang"),
        // "Bob Brown": userListWithRatings.find(user => user.name === "Bob Brown"),
    };
};
