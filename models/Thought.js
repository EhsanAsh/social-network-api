// Desc: This file contains the Thought model for the database
// ==========================================================

// Importing mongoose and reactionSchema
// ==========================================================
const { Schema, model, Types } = require('mongoose');
const Reaction = require('./Reaction');
const dateFormat = require('../utils/dateFormat');
// ==========================================================

// Schema
// ==========================================================
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: 'You must provide a thought!',
            minLength: 1,
            maxLength: 280,
        },

        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal), // Use the dateFormat function to format the timestamp on query. See /utils/dateFormat.js
        },

        username: {
            type: String,
            required: 'You must provide a username!',
        },

        reactions: [Reaction],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);
// ==========================================================

// A virtual called reactionCount that retrieves the length
// of the thought's reactions array field on query.
// ==========================================================
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});
// ==========================================================

// Create the Thought model using the thoughtSchema
// ==========================================================
const Thought = model('Thought', thoughtSchema);
// ==========================================================

// Export the Thought model
// ==========================================================
module.exports = Thought;
// ==========================================================
