const User = require("../models/User");
const bcrypt = require("bcrypt");

async function signInController(req, res) {
    const { email, password } = req.body;
    try {
        const userData = await User.findOne({ email: email });
        if (!userData) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const passwordMatch = await bcrypt.compare(password, userData.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        console.log("userData:", userData);
        return res.status(200).json({ message: "Correct details" });
    } catch (error) {
        console.error("error:", error);
    }

    // return res.json({ message: "This is the signInController function." });
}

module.exports = signInController;
