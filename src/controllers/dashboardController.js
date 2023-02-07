const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const topicModel = require("../models/topicModel");

const showDashboard = async (req, res) => {
  // check token
  const token = req.cookies.token;

  if (token) {
    // get username from token
    const { email } = jwt.decode(token);
    const user = await userModel.findOne({ email: email });
    const allTopics = await topicModel.find();
    res.render("dashboard", { user: user, id: "0", topics: allTopics });
  } else {
    res.redirect("/start");
  }
};

const newTopic = async (req, res) => {
  const token = req.cookies.token;

  if (!token) return res.redirect("/start");

  const { email } = jwt.decode(token);

  const teacher = await userModel.findOne({
    email: email,
    isTeacher: true,
  });

  const topicName = req.body["topic-name"];

  if (!topicName) return res.redirect("/dashboard");

  const students = await userModel.find({ isTeacher: false });

  const topic = await topicModel.create({
    name: topicName,
    assignee: teacher._id,
    students: students.map((s) => s._id),
  });

  const allTopics = await topicModel.find();

  return res.render("dashboard", {
    id: topic._id,
    user: teacher,
    topics: allTopics,
  });
};

const deleteTopic = async (req, res) => {
  const { id } = req.body;

  const token = req.cookies.token;

  if (!token) return res.redirect("/start");

  const { email } = jwt.decode(token);

  const teacher = await userModel.findOne({
    email: email,
    isTeacher: true,
  });

  await topicModel.deleteMany({ name: id });

  const allTopics = await topicModel.find();

  return res.render("dashboard", {
    user: teacher,
    topics: allTopics,
    id: "0",
  });
};

module.exports = { showDashboard, newTopic, deleteTopic };
