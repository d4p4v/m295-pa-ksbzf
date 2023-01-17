const express = require("express");
const { signup, signin } = require("../controllers/userController");

const userRouter = express.Router();

userRouter
    .post("/signup", signup)
    .get("/signup", (req, res) => res.render("signup"));
userRouter.post("/signin", signin).get("/signin", (req, res) => {
    if (req.cookies.token) {
        res.redirect("/dashboard");
    } else {
        res.render("signin");
    }
});

module.exports = userRouter;
