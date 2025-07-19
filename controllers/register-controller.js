const User = require("../models/User");

async function registerController(req, res) {
    const { firstName, lastName, email, password } = req.body;
    try {
        const userEmailExists = await User.findOne({ email: email });
        if (userEmailExists) {
            return res.status(400).json({ message: "This email already exists in the database." });
        }
        const newUser = new User({ firstName, lastName, email, password });
        await newUser.save();
        return res
            .status(201)
            .json({ message: "The user was successfully saved in the database." });
    } catch (error) {
        return res.status(500).json({ message: "An error occurred." });
    }
}

module.exports = registerController;
