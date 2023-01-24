const jwt = require("jsonwebtoken");

const showDashboard = (req, res) => {
    // check token
    const token = req.cookies.token;

    if (token) {
        // get username from token
        const { email, isTeacher } = jwt.decode(token);
        res.render("dashboard", { email: email, isTeacher: isTeacher });
    } else {
        res.redirect("/start");
    }
};

module.exports = { showDashboard };
