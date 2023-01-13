const express = require("express");
const { showDashboard } = require("../controllers/dashboardController");

const dashboardRouter = express.Router();

dashboardRouter.get("/", showDashboard);

module.exports = dashboardRouter;
