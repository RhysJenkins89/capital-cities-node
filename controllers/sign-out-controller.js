const User = require("../models/User");

async function signOutController(req, res) {
    console.log("This is the sign out controller.");
    console.log("This is the request body:", req.body);
    const userEmail = req.body.userEmail;
    const userData = await User.findOne({ email: userEmail });
    if (userData) {
        console.log("userData:");
        console.log(userData);
    }
}

module.exports = signOutController;
