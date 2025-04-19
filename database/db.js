const mongoose = require("mongoose");
require("dotenv").config();
const databasePassword = process.env.mongoPassword;
const uri = `mongodb+srv://rhysjenkins89:${databasePassword}@capital-cities-site.z6o7t.mongodb.net/?retryWrites=true&w=majority&appName=capital-cities-site/continents`;
// const { MongoClient } = require("mongodb");

async function databaseConnect() {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected successfully.");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
    // try {
    //     const mongoClient = new MongoClient(uri);
    //     await mongoClient.connect();
    //     console.log("MongoDB connected successfully.");
    // } catch (error) {
    //     console.error("MongoDB connection error:", error);
    // }
}

module.exports = databaseConnect;
