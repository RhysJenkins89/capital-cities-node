const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Update the MongoDB environment variable in Render

async function signInController(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "The email and password fields are required." });
    }
    try {
        const userData = await User.findOne({ email: email });
        if (!userData) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const passwordMatch = await bcrypt.compare(password, userData.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const payload = {
            sub: userData._id,
            email: userData.email,
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN || "1h",
        });
        return res.status(200).json({ token: token });
    } catch (error) {
        console.error("error:", error);
    }
}

module.exports = signInController;
