const userModel = require("../models/student-model");
const jwt = require("jsonwebtoken");

module.exports = async function (req, res, next) {
    try {
        if (!req.cookies.token) {
            res.locals.error = "You need to Log In first";
            console.log("Token is not being received");
            return res.redirect("/");
        }

        const decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
        const user = await userModel.findOne({ email: decoded.email }).select("-password");

        if (!user) {
            res.locals.error = "User not found";
            return res.redirect("/");
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Authentication error:", error);
        res.locals.error = "You need to Log In first";
        return res.redirect("/");
    }
};
