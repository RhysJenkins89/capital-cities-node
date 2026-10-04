const mongoose = require("mongoose");
require("dotenv").config();
const databasePassword = process.env.MONGO_PASSWORD;
const uri = `mongodb+srv://rhysjenkins89:${databasePassword}@capital-cities-site.z6o7t.mongodb.net/countriesDatabase?retryWrites=true&w=majority&appName=capital-cities-site`; // This will have to change when I update the database structure

async function database() {
  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected successfully.");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

module.exports = database;
