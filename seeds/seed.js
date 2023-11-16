// Desc: This file acts as the seeder for the database, using
// the data from the userData.js and thoughtData.js files.
// ==========================================================
const connection = require('../config/connection');
const { User, Thought } = require('../models');
const generateThoughts = require('./thoughtData');
const generateUser = require('./userData');
// ==========================================================

// Connect to the database
// ==========================================================
connection.on('error', (err) =>
    console.log(`An error occurred while connecting to the database: ${err}`)
);

const connectAndSeed = async () => {
    console.log('Successfully connected to the database.');

    //Delete the collections if they exist
    let thoughtCollection = await connection.db
        .listCollections({ name: 'thoughts' })
        .toArray();
    if (thoughtCollection.length !== 0) {
        await connection.db.dropCollection('thoughts');
    }

    let userCollection = await connection.db
        .listCollections({ name: 'users' })
        .toArray();
    if (userCollection.length !== 0) {
        await connection.db.dropCollection('users');
    }

    // Seed the database
    // ==========================================================
    const users = await User.create(generateUser());
    console.log(`${users.length} users successfully created.`);
    console.table(users);
    const thoughts = await Thought.create(generateThoughts(20));
    console.log(`${thoughts.length} thoughts successfully created.`);
    console.table(thoughts);
    // ==========================================================

    console.info('Seeding complete! 🌱');

    // Disconnect from the database
    // ==========================================================
    await connection.close();
    console.log('Successfully disconnected from the database.');
    // ==========================================================
};

connection.once('open', connectAndSeed);
