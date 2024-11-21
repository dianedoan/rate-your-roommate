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
        rating: '4.5',
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
        rating: '4.0',
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
        rating: '4.0',
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
        rating: '3.5',
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
        rating: '4.0',
        description: 'I like cooking',
        image: profile5,
    },
];

// Utility functions
export const getInitialLikedProfiles = () => {
    return {
        "Alice Wang": userList.find(user => user.name === "Alice Wang"),
        "Bob Brown": userList.find(user => user.name === "Bob Brown"),
    };
};

export const getTopRatedList = () => {
    return userList.filter(user => user.rating >= 4.0);
};
