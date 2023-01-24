const express = require("express");
const userController = require("../controllers/userController");

const userRouter = express.Router();

userRouter.get("/");

userRouter.post("/signup", userController.createAccount);
userRouter.get("/signup", (req, res) => {
    if (req.cookies.token) {
        res.redirect("/dashboard");
    } else {
        res.render("signup");
    }
});

userRouter.post("/signin", userController.signInUser);
userRouter.get("/signin", (req, res) => {
    if (req.cookies.token) {
        res.redirect("/dashboard");
    } else {
        res.render("signin");
    }
});

userRouter.post("/change-password", userController.changePassword);
userRouter.get("/change-password", (req, res) => {
    let message = "";

    if (req.query.errorcode) {
        switch (req.query.errorcode) {
            case "1":
                message = "Passwords do not match.";
                break;
            case "2":
                message = "User doesn't exist.";
                break;
        }
    }
    res.render("changePassword", {
        message: message,
    });
});

userRouter.post("/signout", userController.signOutUser);

module.exports = userRouter;
