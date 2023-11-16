// Desc: This files contains all the functions that are used to handle the user routes
// ==============================================================

// Importing the required modules
// ==============================================================
const { User, Thought } = require('../models');
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
    // ==============================================================

    // Update a user by ID
    // ==============================================================
    async updateOneUser(req, res) { 
        try{
            const userData = await User
                .findOneAndUpdate(
                    { _id: req.params.userId },
                    { $set: req.body },
                    { runValidators: true, new: true }
                )
                .select('-__v');
            if (!userData) {
                res.status(404).json({ message: 'No user found with this ID!' });
                return;
            }
            res.json(userData);
        } catch (err) {
            if (err instanceof mongoose.Error.ValidationError) {
                res.status(400).send({ error: err.message });
            }
            else {
                console.error(`An error occurred while trying to update a user: ${err}`);
                res.status(500).json(err);
            }
        }
    },
    // ==============================================================

    // Delete a user by ID
    // ==============================================================
    async deleteOneUser(req, res) { 
        try {
            const userData = await User
                .findOneAndDelete({ _id: req.params.userId })
                .select('-__v');
            
            if (!userData) {
                res.status(404).json({ message: 'No user found with this ID!' });
                return;
            }

            // Delete the user's associated thoughts by the id inside the thoughts array
            await Thought.deleteMany({ _id: { $in: userData.thoughts } });

            res.json(`User ${userData.username} and their associated thoughts have been deleted!`);

        } catch (err) {
            console.error(`An error occurred while trying to delete a user: ${err}`);
            res.status(500).json(err);
        }
    },
    // ==============================================================

    // Add a friend to a user's friend list
    // ==============================================================
    async addFriend(req, res) { 
        try {
            const userData = await User
                .findOneAndUpdate(
                    { _id: req.params.userId },
                    // Add the friend's ID to the user's friends array
                    { $addToSet: { friends: req.params.friendId } },
                    { runValidators: true, new: true }
                )
                .select('-__v');
            if (!userData) {
                res.status(404).json({ message: 'No user found with this ID!' });
                return;
            }
            res.json(userData);
        } catch (err) {
            console.error(`An error occurred while trying to add a friend: ${err}`);
            res.status(500).json(err);
        }
    },
    // ==============================================================

    // Remove a friend from a user's friend list
    // ==============================================================
    async removeFriend(req, res) { 
        try{
            const userData = await User
                .findOneAndUpdate(
                    { _id: req.params.userId },
                    // Remove the friend's ID from the user's friends array
                    { $pull: { friends: req.params.friendId } },
                    { runValidators: true, new: true }
                )
                .select('-__v');
            if (!userData) {
                res.status(404).json({ message: 'No user found with this ID!' });
                return;
            }
            res.json(userData);
        } catch (err) {
            console.error(`An error occurred while trying to remove a friend: ${err}`);
            res.status(500).json(err);
        }
    },
};
// ==============================================================

// Exporting the userController object
// ==============================================================
module.exports = userController;
// ==============================================================
