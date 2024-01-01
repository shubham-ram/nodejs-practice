const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: String,
    email: {
        type: String,
        requied: true,
        unique: true,
    },
    gender: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const User = mongoose.model("user", userSchema);

module.exports = User
