// Desc: This file contains the Reaction Schema which is
// used in the Thought model as a subdocument
// ==========================================================

// Dependencies
// ==========================================================
const { Schema, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
// ==========================================================

// Schema
// ==========================================================
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },

        reactionBody: {
            type: String,
            required: 'You must provide a reaction!',
            minLength: 1,
            maxLength: 280,
        },

        username: {
            type: String,
            required: 'You must provide a username!',
        },

        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal), // Use the dateFormat function to format the timestamp on query. See /utils/dateFormat.js
        },
    },

    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);
// ==========================================================

// Export the reactionSchema
// ==========================================================
module.exports = reactionSchema;
// ==========================================================
