const express = require("express");

const startRouter = express.Router();

startRouter.get("/", (req, res) => res.render("start"));

module.exports = startRouter;
