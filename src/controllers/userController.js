const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const changePassword = async (req, res) => {
  const { email, password, newPassword } = req.body;

  try {
    const existingUser = await userModel.findOne({ email: email });

    if (!existingUser) {
      return res.redirect("/users/change-password?errorcode=2");
    }

    const matchPassword = await bcrypt.compare(password, existingUser.password);

    if (!matchPassword) {
      return res.redirect("/users/change-password?errorcode=1");
    }

    const newPasswordHash = await bcrypt.hash(newPassword, 10);
    await userModel.updateOne({ email: email }, { password: newPasswordHash });

    res.redirect("/users/signin");
  } catch (err) {
    res.redirect("/users/signup?errorcode=" + String(err).replace(/ /g, "_"));
  }
};

const signOutUser = async (req, res) => {
  res.clearCookie("token");
  res.redirect("/start");
};

const createAccount = async (req, res) => {
  // check existing user
  const { email, password, passwordc, first, last, teacher } = req.body;

  if (password !== passwordc) {
    return res.redirect("/users/signup?errorcode=2");
  }

  try {
    const existingUser = await userModel.findOne({ email: email });

    if (existingUser) return res.redirect("/users/signup?errorcode=1");

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const newUser = await userModel.create({
      email: email,
      password: hashedPassword,
      firstName: first,
      lastName: last,
      isTeacher: teacher == "",
    });

    // generate token
    const token = jwt.sign(
      {
        email: newUser.email,
        id: newUser._id,
        isTeacher: newUser.isTeacher,
      },
      process.env.TOKEN_SECRET_KEY
    );

    // save token as cookie with 7 day expiry
    const exDate = new Date();
    exDate.setDate(exDate.getDate() + 7);

    res.cookie("token", token, { maxAge: 7 * 24 * 60 * 60 * 1000 });

    return res.redirect("/dashboard");
  } catch (er) {
    return res.redirect(
      "/users/signup?errorcode=" + String(err).replace(/ /g, "_")
    );
  }
};

const signInUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await userModel.findOne({ email: email });

    if (!existingUser) return res.redirect("/users/signin?errorcode=1");

    const matchPassword = await bcrypt.compare(password, existingUser.password);

    if (!matchPassword) return res.redirect("/users/signin?errorcode=2");

    const token = jwt.sign(
      {
        email: existingUser.email,
        id: existingUser._id,
        isTeacher: existingUser.isTeacher,
      },
      process.env.TOKEN_SECRET_KEY
    );

    // save token as cookie with 7 day expiry
    const exDate = new Date();
    exDate.setDate(exDate.getDate() + 7);

    res.cookie("token", token, { maxAge: 7 * 24 * 60 * 60 * 1000 });
    return res.redirect("/dashboard");
  } catch (err) {
    return res.redirect(
      "/users/signin?errorcode=" + String(err).replace(/ /g, "_")
    );
  }
};

module.exports = { createAccount, signInUser, signOutUser, changePassword };
