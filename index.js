// Desc: This file is the entry point for the application. It is responsible for starting the server and connecting to the database.
// =============================================================

// Dependencies
// =============================================================
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');
// =============================================================

// Define CWD
// =============================================================
const cwd = process.cwd();
// =============================================================

// Define the Express App
// =============================================================
const PORT = process.env.PORT || 3001;
const app = express();
// =============================================================

// indicate the activity's server which is running in the terminal
// ===============================================
const activity = cwd.includes('01-Sample') ? cwd.split('01-Sample')[1] : cwd;
// ===============================================

// Define the Express Middleware
// =============================================================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);
// =============================================================

// Define the server's listening port
// =============================================================
db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
        console.log(`Activity: ${activity}`);
    });
});
// =============================================================
