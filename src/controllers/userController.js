const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
    console.log("bp1");

    // check existing user
    const { username, email, password } = req.body;

    try {
        const existingUser =
            (await userModel.findOne({ email: email })) ||
            (await userModel.findOne({ username: username }));

        if (existingUser)
            res.status(400).json({
                status: "failed",
                message: "User with this email or username already exists.",
            });

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create user
        const newUser = await userModel.create({
            email: email,
            password: hashedPassword,
            username: username,
        });

        // generate token
        const token = jwt.sign(
            { email: newUser.email, id: newUser._id },
            process.env.TOKEN_SECRET_KEY
        );

        res.status(201).json({
            status: "success",
            user: newUser,
            token: token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "failed",
            message: "Something went wrong.",
        });
    }
};

const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await userModel.findOne({ email: email });

        if (!existingUser)
            res.status(400).json({
                status: "failed",
                message: "User with this email or username doesn't exist.",
            });

        const matchPassword = await bcrypt.compare(
            password,
            existingUser.password
        );

        if (!matchPassword)
            return res
                .status(400)
                .json({ status: "failed", message: "Passwords do not match." });

        const token = jwt.sign(
            { email: existingUser.email, id: existingUser._id },
            process.env.TOKEN_SECRET_KEY
        );

        res.status(201).json({
            status: "success",
            user: existingUser,
            token: token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "failed",
            message: "Something went wrong.",
        });
    }
};

module.exports = { signup, signin };
