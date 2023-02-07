const express = require("express");
const { getStudents } = require("../controllers/apiController");

const apiRouter = express.Router();

apiRouter.get("/students", getStudents);

module.exports = apiRouter;
