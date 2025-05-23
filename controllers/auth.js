const User = require("../models/User.js");

async function Register(req, res) {
    const { firstName, lastName, email, password } = req.body;
    try {
        const newUser = new User({
            firstName,
            lastName,
            email,
            password,
        });
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                status: "failed",
                data: [],
                message:
                    "It seems you already have an account. Please log in instead.",
            });
        } else {
            const savedUser = await newUser.save(); // save new user into the database
            const { role, ...user_data } = savedUser._doc;
            res.status(200).json({
                status: "success",
                data: [user_data],
                message:
                    "Thank you for registering with us. Your account has been successfully created.",
            });
        }
    } catch (error) {
        res.status(500).json({
            status: "error",
            code: 500,
            data: [],
            message: "Internal Server Error",
            error: { message: error.message, stack: error.stack },
        });
    }
    res.end();
}

module.exports = Register;
