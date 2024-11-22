import profile1 from "../assets/images/profile-pics/profile1.jpg";
import profile2 from "../assets/images/profile-pics/profile2.jpg";
import profile3 from "../assets/images/profile-pics/profile3.jpg";
import profile4 from "../assets/images/profile-pics/profile4.jpg";
import profile5 from "../assets/images/profile-pics/profile5.jpg";

// Registered Users
export const registeredUsers = [
    {
        id: 'sally-smith',
        username: 'sallysmith',
        password: 'password123', 
    },
    {
        id: 'john-fitzgerald',
        username: 'johnfitz',
        password: 'john123',
    },
];

// Centralized list of all users
export const userList = [
    {
        id: 'alice-wang',
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

// Review Cards Data
export const reviewsData = [
    {
        id: 'review1',
        userId: 'john-fitzgerald', // The user the review is for
        score: 3.0, // Numeric score
        title: 'Too many cats',
        description: 'cat hair everywhere :(',
        username: 'Anonymous',
        date: 'September 27, 2024',
    },
    {
        id: 'review2',
        userId: 'alice-wang', // The user the review is for
        score: 4.0, // Numeric score
        title: 'Good roommate',
        description: 'Great cook, very respectful.',
        username: 'Anonymous',
        date: 'October 2, 2024',
    },
    {
        id: 'review3',
        userId: 'alice-wang',
        score: 4.5,
        title: 'Fun to live with!',
        description: 'Alice is super chill and great to hang out with. Highly recommend!',
        username: 'Tom H.',
        date: 'November 12, 2024',
    },
    {
        id: 'review4',
        userId: 'dave-jones',
        score: 5.0,
        title: 'Fantastic roommate',
        description: 'Dave is super clean and always respectful of shared spaces.',
        username: 'Sarah L.',
        date: 'August 18, 2024',
    },
    {
        id: 'review5',
        userId: 'bob-brown',
        score: 2.5,
        title: 'Messy and noisy',
        description: 'Bob often left dishes unwashed and played music loudly late at night.',
        username: 'Chris M.',
        date: 'October 8, 2024',
    },
    {
        id: 'review6',
        userId: 'alice-wang',
        score: 5.0,
        title: 'Amazing experience!',
        description: 'Alice was the best roommate I’ve ever had. Very considerate and fun!',
        username: 'Emily W.',
        date: 'July 5, 2024',
    },
    {
        id: 'review7',
        userId: 'john-fitzgerald',
        score: 2.0,
        title: 'Not ideal',
        description: 'While John was kind, the cats made the place smell bad and unlivable.',
        username: 'Sam K.',
        date: 'September 30, 2024',
    },
    {
        id: 'review8',
        userId: 'alice-wang',
        score: 4.5,
        title: 'Wonderful roommate',
        description: 'Sally always respected my privacy and shared her amazing meals!',
        username: 'Jenna R.',
        date: 'June 20, 2024',
    },
    {
        id: 'review9',
        userId: 'bob-brown',
        score: 3.0,
        title: 'Roommate with potential',
        description: 'Bob was okay, but his habits could use some improvement.',
        username: 'Tony B.',
        date: 'May 15, 2024',
    },
    {
        id: 'review10',
        userId: 'dave-jones',
        score: 4.5,
        title: 'Best roommate ever',
        description: 'Dave is incredibly organized and always on time with bills.',
        username: 'Anna F.',
        date: 'December 1, 2024',
    },
    {
        id: 'review11',
        userId: 'john-fitzgerald',
        score: 3.5,
        title: 'Cat lover’s dream',
        description: 'If you love cats, John is a great roommate. Just be ready to vacuum!',
        username: 'Laura T.',
        date: 'November 9, 2024',
    },
    {
        id: 'review12',
        userId: 'alice-wang',
        score: 4.0,
        title: 'Pleasant to live with',
        description: 'Very friendly and kind, always open to solving issues cooperatively.',
        username: 'Mike D.',
        date: 'April 17, 2024',
    },
    {
        id: 'review13',
        userId: 'bob-brown',
        score: 2.0,
        title: 'Needs improvement',
        description: 'Messy, noisy, and often late on bills. Tough to live with.',
        username: 'Riley S.',
        date: 'March 23, 2024',
    },
    {
        id: 'review14',
        userId: 'dave-jones',
        score: 5.0,
        title: 'Perfect roommate!',
        description: 'Dave is thoughtful and respectful of others. A dream roommate.',
        username: 'Patricia K.',
        date: 'October 25, 2024',
    },
    {
        id: 'review15',
        userId: 'alice-wang',
        score: 4.0,
        title: 'Great balance',
        description: 'Alice is fun but knows when to respect personal space. Highly recommend.',
        username: 'Nathan P.',
        date: 'August 12, 2024',
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
