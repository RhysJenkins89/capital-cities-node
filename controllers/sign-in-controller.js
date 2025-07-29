const User = require("../models/User");
const bcrypt = require("bcrypt");

// Update the MongoDB environment variable in Render

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

    // // Step 3: Create JWT payload
    // const payload = {
    //   sub: user._id,
    //   email: user.email,
    // };

    // // Step 4: Sign the token
    // const token = jwt.sign(payload, process.env.JWT_SECRET, {
    //   expiresIn: process.env.JWT_EXPIRES_IN || '1h',
    // });

    // // Step 5: Send token to client
    // res.status(200).json({ token });

    // return res.json({ message: "This is the signInController function." });
}

module.exports = signInController;
