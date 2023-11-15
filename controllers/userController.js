// Desc: This files contains all the functions that are used to handle the user routes
// ==============================================================

// Importing the required modules
// ==============================================================
const { User } = require('../models');
// ==============================================================

// Defining the userController object
// ==============================================================
const userController = {
    // Get all users
    // ==============================================================
    async getAllUsers(req, res) {
        try {
            const userData = await User
                .find()
                .pretty()
                .select('-__v')
                .sort({ _id: 1 });
            res.json(userData);
        } catch (err) {
            console.error(`An error occurred while trying to get all users: ${err}`);
            res.status(500).json(err);
        }
    },
    // ==============================================================

    // Get a single user by ID
    // ==============================================================
    async getSingleUser(req, res) { 
        try {
            const userData = await User
                .findOne({ _id: req.params.userId })
                .select('-__v')
                .populate('friends')
                .populate('thoughts');
            if (!userData) {
                res.status(404).json({ message: 'No user found with this ID!' });
                return;
            }
            res.json(userData);
        } catch (err) {
            console.error(`An error occurred while trying to get a single user: ${err}`);
            res.status(500).json(err);
        }
    },
    // ==============================================================

    // Create a new user
    // ==============================================================
    async createNewUser(req, res) { 
        try {
            const userData = await User.create(req.body);
            res.json(userData);

        } catch (err) {
            if (err instanceof mongoose.Error.ValidationError) {
                res.status(400).send({ error: err.message });
            }
            else if (err.code === 11000) {
                res.status(400).send({ error: 'This username or email is already in use!' });
            }
            else {
                console.error(`An error occurred while trying to create a new user: ${err}`);
                res.status(500).json(err);
            }
        }
    },
};
// ==============================================================

// Exporting the userController object
// ==============================================================
module.exports = userController;
// ==============================================================
