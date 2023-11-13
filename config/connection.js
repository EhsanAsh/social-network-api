// Desc: This file is used to connect to the MangoDB database
// =============================================================

// Import the mongoose module and create a connection to the database
// =============================================================
const { connect, connection } = require('mongoose');
connect(process.env.MONGODB_URI || 'mongodb://localhost/socialNetDB');
// =============================================================

// Export the connection
// =============================================================
module.exports = connection;
