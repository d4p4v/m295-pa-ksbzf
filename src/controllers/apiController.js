const userModel = require("../models/userModel");

const getStudents = async (req, res) => {
  const students = await userModel.find({ isTeacher: false });
  return students;
};

module.exports = { getStudents };
