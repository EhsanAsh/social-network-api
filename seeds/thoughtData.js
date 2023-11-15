// Desc: This file contains the data for the thoughts
// ==========================================================

// Import the dateFormat function
// ==========================================================
const { get } = require('../models/Reaction');
// ==========================================================

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

// An array of thought texts
// ==========================================================
const thoughts = [
    'I love Race cars!',
    'I love formula 1!',
    'I love NASCAR!',
    'I love Indy cars!',
    'I love Rally cars!',
    'I love Le Mans!',
    'I love Drag Racing!',
    'I love Motorcycles!',
    'I love Motocross!',
    'I love Dirt Bikes!',
    'I love Enduro!',
    'I love Superbikes!',
    'I love Supermoto!',
    'I love MotoGP!',
    'I love Supercross!',
    'I love Monster Trucks!',
    'I love Off Road Racing!',
    'I love Trophy Trucks!',
    'I love Baja Racing!',
    'I love Rallycross!',
    'I love Drifting!',
    'I love Autocross!',
    'I love Hill Climbing!',
    'I love Time Attack!',
    'I love Road Racing!',
    'I love Kart Racing!',
];
// ==========================================================

// An array of reaction texts
// ==========================================================
const reactions = [
    '😂',
    '😍',
    'Great thought!',
    'Fantastic thought!',
    '🤓',
    '🤗',
    '🤑',
    '🤠',
    'Funny thought!',
    '🥺',
    '🤑',
    '🤠',
    '🤡',

    'Admirable thought!',
    '🤓',
    '🤗',
    '🤑',
    'Hilarious thought!',
    '😭',
    '😡',
    '🤔',
    'Interesting thought!',
    'Agree with you!',
    '🤯',
    '🥶',
    '🤢',
    'Disagree with you!',
    'Might be true!',
    '🤡',
    '🥳',
    '🥴',
    'Might be false!',
    '🤮',
    '🤬',
    '🤫',
    '🤥',
    '🤭',
    '🤪',
    'No idea what you are talking about!',
];
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

// Get a random thought from the thoughts array
// ==========================================================
const getRandomThought = () => getRandom(thoughts);
// ==========================================================

// Get a random reaction from the reactions array
// ==========================================================
const getRandomReaction = () => getRandom(reactions);
// ==========================================================

// function to generate random date
// creating a random date between January 1, 2012 and now.
// Used (https://www.w3schools.com/js/js_dates.asp) as a reference
// ==========================================================
const getRandomDate = () => {
    const start = new Date(2012, 0, 1);
    const end = new Date();
    const randomDate = new Date(
        start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
    return randomDate.toISOString().split('T')[0];
};
// ==========================================================

// Function to generate random thoughts that we can add to
// the database including reactions related to the thoughts
// ==========================================================
const generateThoughts = (int) => {
    const thoughtData = [];
    let date = getRandomDate();

    for (let i = 0; i < int; i++) {
        const thought = {
            thoughtText: getRandomThought(),
            createdAt: date,
            username: getRandomUsername(),
            reactions: [],
        };

        const numberOfReactions = Math.floor(Math.random() * 10) + 1; // Generate a random number between 1 and 10

        for (let j = 0; j < numberOfReactions; j++) {
            const reaction = {
                reactionBody: getRandomReaction(),
                username: getRandomUsername(),
                createdAt: date,
            };

            thought.reactions.push(reaction);
        }

        thoughtData.push(thought);
    }

    return thoughtData;
};

// Export the data
// ==========================================================
module.exports = generateThoughts;
// ==========================================================
