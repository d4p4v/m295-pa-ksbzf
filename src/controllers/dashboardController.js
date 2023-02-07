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
    res.render("dashboard", { user: user, id: "0" });
  } else {
    res.redirect("/start");
  }
};

const newTopic = async (req, res) => {
  const token = req.cookies.token;

  if (!token) return res.redirect("/start");

  const { email } = jwt.decode(token);
  console.log(email);
  const teacher = await userModel.findOne({
    email: email,
    isTeacher: true,
  });
  console.log(teacher);

  const topicName = req.body["topic-name"];

  if (!topicName) return res.redirect("/dashboard");

  const students = await userModel.find({ isTeacher: false });

  const topic = await topicModel.create({
    name: topicName,
    assignee: teacher._id,
    students: students.map((s) => s._id),
  });

  return res.render("dashboard", {
    id: topic._id,
    user: teacher,
  });
};

module.exports = { showDashboard, newTopic };
