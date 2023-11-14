// Desc: This file contains the data for the users.
// ==========================================================
//user: username, email, thoughts

const { get } = require('mongoose');

// Assigning the data to variables
// ==========================================================
const names = [
    'Bobby Joe',
    'Billy Bob',
    'Benny Jack',
    'Johnny Jim',
    'Jimmy John',
    'Timmy Tom',
    'Tommy Tim',
    'Terry Albacore',
    'Jerry Alba',
    'Larry Albatross',
    'Barry Brown',
    'Harry Rod',
    'Carrie Ann',
    'Mary Jane',
    'Gary Indiana',
    'Perry Mason',
    'Kerry Washington',
    'Alex Rodriguez',
    'Alexis Tomlin',
    'Alba Trass',
    'Alexandra Hakim',
    'Alexandria Casio-Cortes',
    'Mark Twain',
    'Marcus Aurelius',
    'Marc Anthony',
    'Marquis de Sade',
];

// A function to create emails from the names array
// ==========================================================
const createEmail = (name) => {
    return `${name.split(' ')[0].toLowerCase()}@thoughts.com`;
};
// ==========================================================

// Get a random item from an array
// ==========================================================
const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
// ==========================================================

// Get a random username from the names array
// ==========================================================
const getRandomUsername = () =>
    `${getRandom(names).split(' ')[0].toLowerCase()}${Math.floor(
        Math.random() * 10 + 1
    )}`;
// ==========================================================

// Get a random email from the names array using the createEmail function
// ==========================================================
const getRandomEmail = () => createEmail(getRandom(names));
// ==========================================================

// Generate User data and return as an array
// ==========================================================
const generateUser = () => {
    const users = [];

    for (let i = 0; i < 20; i += 1) {
        const username = getRandomUsername();
        const email = getRandomEmail();
        const user = {
            username,
            email,
        };

        users.push(user);
    }

    return users;
};

// Export the data
// ==========================================================
module.exports = generateUser;
// ==========================================================
