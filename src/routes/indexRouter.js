const express = require("express");

const indexRouter = express.Router();

indexRouter.get("/", (req, res) => {
    if (req.cookies.token) {
        res.redirect("/dashboard");
    } else {
        res.redirect("/start");
    }
});

module.exports = indexRouter;
