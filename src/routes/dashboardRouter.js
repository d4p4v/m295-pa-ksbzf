const express = require("express");
const { showDashboard, newTopic } = require("../controllers/dashboardController");

const dashboardRouter = express.Router();

dashboardRouter.get("/", showDashboard);

dashboardRouter.post("/new-topic", newTopic)

module.exports = dashboardRouter;
