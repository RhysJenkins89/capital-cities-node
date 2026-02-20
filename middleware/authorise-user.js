const jwt = require("jsonwebtoken");

function authoriseUser(req, res, next) {
    console.log("This is the authoriseUser function.");
    console.log("req.cookies:");
    console.log(req.cookies);
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Token required." });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "An error occurred." });
    }
    // I would imagine that I need to call next() at some point here.
}

module.exports = authoriseUser;
