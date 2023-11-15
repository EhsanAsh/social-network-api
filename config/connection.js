// Desc: This file is used to connect to the MangoDB database
// =============================================================

// Import the mongoose module and create a connection to the database
// =============================================================
const { connect, connection } = require('mongoose');
connect('mongodb://127.0.0.1:27017/socialNetDB');
// =============================================================

// Export the connection
// =============================================================
module.exports = connection;
