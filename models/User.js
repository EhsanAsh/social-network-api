// Desc: This file contains the User model for the database
// ==========================================================

// Dependencies
// ==========================================================
const { Schema, model } = require('mongoose');
// ==========================================================

// Schema
// ==========================================================
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: 'You must provide a username!',
            trim: true,
            validate: {
                validator: function (v) {
                    return v.length >= 3 && v.length <= 20;
                },
                message: (props) =>
                    `${props.value} is not a valid username! Usernames must be between 3 and 20 characters long.`,
            },
        },

        email: {
            type: String,
            unique: true,
            lowercase: true,
            required: 'You must provide an email!',
            match: [
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                'Please fill a valid email address',
            ],
        },

        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            },
        ],

        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
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

// A virtual called friendCount that retrieves the length
// of the user's friends array field on query.
// ==========================================================
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});
// ==========================================================

// Middleware to remove a user's associated thoughts
// ==========================================================
userSchema.pre('findOneAndRemove', async function (next) {
    await this.model('Thought').deleteMany({ userId: this._id });
    next();
});
// ==========================================================

// Create the User model using the userSchema
// ==========================================================
const User = model('User', userSchema);
// ==========================================================

// Export the User model
// ==========================================================
module.exports = User;
// ==========================================================
