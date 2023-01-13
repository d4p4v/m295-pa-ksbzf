require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const dashboardRouter = require("./routes/dashboardRouter");
const userRouter = require("./routes/userRouter");

const app = express();

// Setup
app.set("views", `${__dirname}/views`);
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

// Routes
app.use("/users", userRouter);
app.use("/dashboard", dashboardRouter);

app.get("/", (req, res) => {
    console.log("ass");
    res.status(200).json({ message: "hello from server" });
});

// DB Connection
const DB_STRING = process.env.DB_CONNECTION_STRING.replace(
    "<username>",
    process.env.DB_USERNAME1
).replace("<password>", process.env.DB_PASSWORD1);

mongoose
    .connect(DB_STRING)
    .then(() => {
        app.listen(5000, () => console.log("Server started on port 5000"));
    })
    .catch((err) => console.log(err));
