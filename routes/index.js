// Desc: This file acts as the main hub for all of the API routes
// ==============================================================

// Importing the required modules
// ==============================================================
const router = require('express').Router();
const apiRoutes = require('./api');
// ==============================================================

// Use the apiRoutes
// ==============================================================
router.use('/api', apiRoutes);
router.use((req, res) => {
    res.status(404).send('Wrong route! Please try again.');
});
// ==============================================================

// Exporting the router
// ==============================================================
module.exports = router;
// ==============================================================