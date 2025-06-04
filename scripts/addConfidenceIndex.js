console.log("This is the addConfidenceIndex.js file.");

const mongoose = require("mongoose");
const databaseConnect = require("../database/db");
const CountrySchema = require("../models/Country");

// const modelName = capitaliseFirstLetter(continentName);
const EuropeModel = mongoose.model("Europe", CountrySchema, "europe");

(async () => {
    try {
        await databaseConnect();
        if (mongoose.connection.readyState === 1) {
            console.log("Connected to the Mongo database.");
            const result = await EuropeModel.updateMany({}, [{ $set: { confidenceIndex: 1 } }]);
            console.log(`Updated ${result.modifiedCount} documents.`);
        }
    } catch (error) {
        console.log("Something went wrong:", error);
    } finally {
        mongoose.disconnect();
        console.log("Disconnected from the DB.");
    }
})();

// In MongoDB, think database, collection, document. That is to say, a database hold one or many collections; a collection holds one or many documents.
