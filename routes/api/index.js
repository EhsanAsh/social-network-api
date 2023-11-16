// Desc: This file acts as the main hub for all of the user and thought routes
// ==============================================================

// Importing the required modules
// ==============================================================
const router = require('express').Router();
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');
// ==============================================================

// Use the userRoutes and thoughtRoutes
// ==============================================================
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);
// ==============================================================

// Exporting the router
// ==============================================================
module.exports = router;
// ==============================================================