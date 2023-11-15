// Desc: This file contains all the functions that are
// used to handle the thought routes and reactions
// ==============================================================

// Importing the required modules
// ==============================================================
const { User, Thought } = require('../models');
// ==============================================================

// Defining the thoughtController object
// ==============================================================
const thoughtController = {
    // Get all thoughts
    // ==============================================================
    async getAllThoughts(req, res) {
        try {
            const thoughtData = await Thought
                .find()
                .pretty()
                .select('-__v')
                .sort({ _id: 1 });
            res.json(thoughtData);
        } catch (err) {
            console.error(`An error occurred while trying to get all thoughts: ${err}`);
            res.status(500).json(err);
        }
    },
    // ==============================================================

    // Get a single thought by ID
    // ==============================================================
    async getSingleThought(req, res) {
        try {
            const thoughtData = await Thought
                .findOne({ _id: req.params.thoughtId })
                .select('-__v')
                .populate('reactions');
            if (!thoughtData) {
                res.status(404).json({ message: 'No thought found with this ID!' });
                return;
            }
            res.json(thoughtData);
        } catch (err) {
            console.error(`An error occurred while trying to get a single thought: ${err}`);
            res.status(500).json(err);
        }
    },
    // ==============================================================

    // Create a new thought
    // ==============================================================
    async createNewThought(req, res) {
        try {
            const thoughtData = await Thought.create(req.body);
            const userData = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: thoughtData._id } },
                { runValidators: true, new: true }
            );
            if (!userData) {
                res.status(404).json({ message: 'No user found with this ID!' });
                return;
            }
            res.json(thoughtData);
        } catch (err) {
            console.error(`An error occurred while trying to create a new thought: ${err}`);
            res.status(500).json(err);
        }
    },
    // ==============================================================

    // Update a thought by ID
    // ==============================================================
    async updateThought(req, res) {
        try {
            const thoughtData = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );
            if (!thoughtData) {
                res.status(404).json({ message: 'No thought found with this ID!' });
                return;
            }
            res.json(thoughtData);
        } catch (err) {
            console.error(`An error occurred while trying to update a thought: ${err}`);
            res.status(500).json(err);
        }
    },
    // ==============================================================
    
    // Delete a thought by ID
    // ==============================================================
    async removeThought(req, res) { 
      try {
        const thoughtData = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
        if (!thoughtData) {
          res.status(404).json({ message: 'No thought found with this ID!' });
          return;
        }

        const userData = await User.findOneAndUpdate(
            { _id: thoughtData.userId },
            { $pull: { thoughts: req.params.thoughtId } },
            { runValidators: true, new: true }
        );

        if (!userData) {
            res.status(404).json({ message: 'No user found with this ID!' });
            return;
        }

        res.json(`Thought ${thoughtData._id} and its associated reactions have been deleted!`);

      } catch (err) {
        console.error(`An error occurred while trying to delete a thought: ${err}`);
        res.status(500).json(err);
      }
    },

};
// ==============================================================

// Export the thoughtController object
// ==============================================================
module.exports = thoughtController;
// ==============================================================