const User = require("../models/User");

async function registerController(req, res) {
    res.json({ message: "This is the registerController function" });
    const { firstName, lastName, email, password } = req.body;

    // Save the user
    const newUser = new User({ firstName, lastName, email, password });
    const userIsUnique = await User.find({ email: email });
    console.log("newUser:", newUser);
    console.log("newUser is unique:", userIsUnique);

    // If the user is unique, save the user to the database:
    // await newUser.save();
}

module.exports = registerController;
