const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "A user must have a username"],
        unique: true,
        trim: true,
        maxlength: [
            16,
            "A username must have less or equal than 16 characters",
        ],
        minlength: [3, "A username must have more or equal than 3 characters"],
    },
    email: {
        type: String,
        required: [true, "A user must have an email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "A user must have a password"],
        minlength: [
            10,
            "A user's password must consist of at least 10 characters or more",
        ],
    },
    firstName: {
        type: String,
        required: false,
    },
    lastName: {
        type: String,
        required: false,
    },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
