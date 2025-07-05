const User = require("../models/User");

async function registerController(req, res) {
    res.json({ message: "This is the registerController function" });
    const { firstName, lastName, email, password } = req.body;

    // Save the user
    const newUser = new User({ firstName, lastName, email, password });
    console.log("newUser:", newUser);
}

module.exports = registerController;
