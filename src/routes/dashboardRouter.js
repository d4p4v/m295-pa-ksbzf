const express = require("express");
const {
  showDashboard,
  newTopic,
  deleteTopic,
} = require("../controllers/dashboardController");

const dashboardRouter = express.Router();

dashboardRouter.get("/", showDashboard);

dashboardRouter.post("/new-topic", newTopic);
dashboardRouter.get("/new-topic", (req, res) => res.redirect("/"));

dashboardRouter.post("/delete-topic", deleteTopic);
dashboardRouter.get("/delete-topic", (req, res) => res.redirect("/"));

module.exports = dashboardRouter;
