const mongoose = require("mongoose");
require("dotenv").config();
const databasePassword = process.env.mongoPassword;
const uri = `mongodb+srv://rhysjenkins89:${databasePassword}@capital-cities-site.z6o7t.mongodb.net/countriesDatabase?retryWrites=true&w=majority&appName=capital-cities-site`;

async function databaseConnect() {
    try {
        await mongoose.connect(uri);
        console.log("MongoDB connected successfully.");
    } catch (error) {
        // If there is no internet, this won't fail gracefully. It's a rare case, but it's worth considering.
        console.error("MongoDB connection error:", error);
    }
}

module.exports = databaseConnect;
