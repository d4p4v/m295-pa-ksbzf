const express = require("express");
const { signup, signin } = require("../controllers/userController");

const userRouter = express.Router();

userRouter
    .post("/signup", (req, res) => signup(req, res))
    .get("/signup", (req, res) => res.render("signup"));
userRouter
    .post("/signin", (req, res) => signin(req, res))
    .get("/signin", (req, res) => res.render("signin"));

module.exports = userRouter;
