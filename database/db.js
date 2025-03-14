const mongoose = require("mongoose");
const secrets = require("../secrets");
const uri = `mongodb+srv://rhysjenkins89:${secrets.mongoPassword}@capital-cities-site.z6o7t.mongodb.net/?retryWrites=true&w=majority&appName=capital-cities-site`;

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
}

module.exports = databaseConnect;
