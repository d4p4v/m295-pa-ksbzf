const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "A user must have an email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "A user must have a password"],
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
