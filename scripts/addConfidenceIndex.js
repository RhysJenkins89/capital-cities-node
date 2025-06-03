console.log("This is the addConfidenceIndex.js file.");

const mongoose = require("mongoose");
const databaseConnect = require("../database/db");
const CountrySchema = require("../models/Country");

const Model = mongoose.model("Country", CountrySchema); // Rename

databaseConnect().then(async () => {
    if (mongoose.connection.readyState === 1) {
        console.log("Connected to the Mongo database.");
        const result = await Model.updateMany({}, { $set: { confidenceIndex: "1" } });
        console.log(`Updated ${result.modifiedCount} documents.`);
    } else {
        console.log("Not connected.");
    }
});
