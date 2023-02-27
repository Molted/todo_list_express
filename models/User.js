const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username field is required"]
    },
    email: {
        type: String,
        required: [true, "Email field is required"],
        unique: [true, 'Email address already exist']
    },
    password: {
        type: String,
        required: [true, "Password field is required"],
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('User', UserSchema);