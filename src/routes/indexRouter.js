const express = require("express");

const indexRouter = express.Router();

indexRouter.get("/", (req, res) => res.redirect("/start"));

module.exports = indexRouter;
