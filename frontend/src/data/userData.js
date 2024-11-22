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
        occupation: 'Athlete',
        description: 'I love skating and sleeping',
        image: profile1,
        preferences: ['Early Riser', 'Pet Owner', 'Clean & Tidy', 'Likes Socializing', 'Vegetarian']
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
        occupation: 'Neurosurgeon',
        description: 'I have a passion for biking',
        image: profile2,
        preferences: ['Late Sleeper', 'Smoker Friendly', 'Fitness Enthusiast', 'Non-Vegetarian']
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
        occupation: 'Student',
        description: 'NEED a roommate ASAP',
        image: profile3,
        preferences: ['Messy', 'Organized', 'Homebody', 'Non-Smoker']
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
        occupation: 'Software Engineer',
        description: 'I own a lot of cats',
        image: profile4,
        preferences: ['Pet Owner', 'Smoker Friendly', 'Goes Out Often', 'Vegetarian']
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
        occupation: 'Teacher',
        description: 'I like cooking',
        image: profile5,
        preferences: ['Clean & Tidy', 'Organized', 'Likes Socializing', 'Vegan']
    },
];

export const reviewsData = [
    {
        id: 'review-1',
        userId: 'john-fitzgerald',
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
        id: 'review-2',
        userId: 'alice-wang',
        username: 'Anonymous',
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
        id: 'review-3',
        userId: 'alice-wang',
        username: 'Tom H.',
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
        id: 'review-4',
        userId: 'dave-jones',
        username: 'Sarah L.',
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
        id: 'review-5',
        userId: 'bob-brown',
        username: 'Chris M.',
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
        id: 'review-6',
        userId: 'alice-wang',
        username: 'Emily W.',
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
        id: 'review-7',
        userId: 'john-fitzgerald',
        username: 'Sam K.',
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
        id: 'review-8',
        userId: 'alice-wang',
        username: 'Jenna R.',
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
        id: 'review-9',
        userId: 'bob-brown',
        username: 'Tony B.',
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
        id: 'review-10',
        userId: 'dave-jones',
        username: 'Anna F.',
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
        id: 'review-11',
        userId: 'john-fitzgerald',
        username: 'Laura T.',
        ratings: {
            cleanliness: 3,
            communication: 4,
            timeliness: 3,
            noiseLevel: 4,
            etiquette: 3,
        },
        score: 3.4,
        title: 'Cat lover’s dream',
        description: 'If you love cats, John is a great roommate. Just be ready to vacuum!',
        yesNoAnswers: [
            { question: 'Was this roommate respectful of your space?', answer: 'Yes' },
            { question: 'Was this roommate punctual with paying their living fees?', answer: 'Yes' },
            { question: 'Would you be roommates again?', answer: 'No' }
        ],
        date: '11/09/2024',
    },
    {
        id: 'review-12',
        userId: 'alice-wang',
        username: 'Mike D.',
        ratings: {
            cleanliness: 4,
            communication: 4,
            timeliness: 4,
            noiseLevel: 3,
            etiquette: 4,
        },
        score: 4.0,
        title: 'Pleasant to live with',
        description: 'Very friendly and kind, always open to solving issues cooperatively.',
        yesNoAnswers: [
            { question: 'Was this roommate respectful of your space?', answer: 'Yes' },
            { question: 'Was this roommate punctual with paying their living fees?', answer: 'Unsure' },
            { question: 'Would you be roommates again?', answer: 'Yes' }
        ],
        date: '04/17/2024',
    },
    {
        id: 'review-13',
        userId: 'bob-brown',
        username: 'Riley S.',
        ratings: {
            cleanliness: 2,
            communication: 2,
            timeliness: 1,
            noiseLevel: 4,
            etiquette: 2,
        },
        score: 2.2,
        title: 'Needs improvement',
        description: 'Messy, noisy, and often late on bills. Tough to live with.',
        yesNoAnswers: [
            { question: 'Was this roommate respectful of your space?', answer: 'No' },
            { question: 'Was this roommate punctual with paying their living fees?', answer: 'Unsure' },
            { question: 'Would you be roommates again?', answer: 'No' }
        ],
        date: '03/23/2024',
    },
    {
        id: 'review-14',
        userId: 'dave-jones',
        username: 'Patricia K.',
        ratings: {
            cleanliness: 5,
            communication: 5,
            timeliness: 5,
            noiseLevel: 2,
            etiquette: 5,
        },
        score: 4.6,
        title: 'Perfect roommate!',
        description: 'Dave is thoughtful and respectful of others. A dream roommate.',
        yesNoAnswers: [
            { question: 'Was this roommate respectful of your space?', answer: 'Yes' },
            { question: 'Was this roommate punctual with paying their living fees?', answer: 'Yes' },
            { question: 'Would you be roommates again?', answer: 'Yes' }
        ],
        date: '10/25/2024',
    },
    {
        id: 'review-15',
        userId: 'alice-wang',
        username: 'Nathan P.',
        ratings: {
            cleanliness: 4,
            communication: 4,
            timeliness: 4,
            noiseLevel: 3,
            etiquette: 5,
        },
        score: 4.2,
        title: 'Great balance',
        description: 'Alice is fun but knows when to respect personal space. Highly recommend.',
        yesNoAnswers: [
            { question: 'Was this roommate respectful of your space?', answer: 'Yes' },
            { question: 'Was this roommate punctual with paying their living fees?', answer: 'Unsure' },
            { question: 'Would you be roommates again?', answer: 'Yes' }
        ],
        date: '08/12/2024',
    },
];

// Set initial liked/saved profiles
export const getInitialLikedProfiles = () => {
    return {
        "Alice Wang": userListWithRatings.find(user => user.name === "Alice Wang"),
        "Bob Brown": userListWithRatings.find(user => user.name === "Bob Brown"),
    };
};

// Calculate average rating for a user based on their reviews
export const calculateAverageRating = (userId) => {
    // Filter reviews by the user
    const userReviews = reviewsData.filter(review => review.userId === userId);
    
    // Calculate the sum of the scores and the number of reviews
    const totalScore = userReviews.reduce((acc, review) => acc + parseFloat(review.score), 0);
    const averageRating = totalScore / userReviews.length;

    // Round to 1 decimal place
    return averageRating ? Math.round(averageRating * 10) / 10 : 0;
};

// Add dynamic rating calculation to each user
export const userListWithRatings = userList.map(user => ({
    ...user,
    rating: calculateAverageRating(user.id), // Calculate and add the average rating
}));

// Filter users with a rating of 4.0 or higher
export const getTopRatedList = () => {
    return userListWithRatings.filter(user => user.rating >= 4.0);
};

// Function to generate the star rating based on score
export const generateStarRating = (score) => {
    const filledStars = '★'.repeat(Math.floor(score));
    const halfStar = score % 1 >= 0.5 ? '½' : ''; // Check if score has a .5 and add "½" if true
    return filledStars + halfStar;
};
