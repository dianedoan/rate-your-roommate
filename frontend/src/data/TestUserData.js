import profile1 from "../assets/images/profile-pics/profile1.jpg";
import profile2 from "../assets/images/profile-pics/profile2.jpg";
import profile3 from "../assets/images/profile-pics/profile3.jpg";
import profile4 from "../assets/images/profile-pics/profile4.jpg";
import profile5 from "../assets/images/profile-pics/profile5.jpg";

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
    },
];

// Review Cards Data with dynamic stars based on score
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
        userId: 'sally-smith', // The user the review is for
        score: 4.0, // Numeric score
        title: 'Good roommate',
        description: 'Great cook, very respectful.',
        username: 'Anonymous',
        date: 'October 2, 2024',
    },
];

// Set initial liked/saved profiles
export const getInitialLikedProfiles = () => {
    return {
        "Alice Wang": userList.find(user => user.name === "Alice Wang"),
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
    return filledStars;
};
