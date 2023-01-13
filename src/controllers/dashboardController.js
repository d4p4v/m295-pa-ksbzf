const jwt = require("jsonwebtoken");

const showDashboard = (req, res) => {
    // check token
    const token = req.cookies.token;

    // get username from token
    const email = jwt.decode(token).email;

    if (token) {
        res.render("dashboard", { email: email });
    } else res.status(401).json({ message: "Unauthorized" });
};

module.exports = { showDashboard };
