// This script updates my MongoDB structure. From multiple continent collections, I'll go to a single countries collection. Each country document will feature a continent property.

const mongoose = require("mongoose");
const databaseConnect = require("../database/db");

const continentNames = ["europe", "africa", "asia", "north-america", "south-america", "oceania"];

const countrySchema = new mongoose.Schema({}, { strict: false });
const Country = mongoose.model("Country", countrySchema, "countries");

(async () => {
    try {
        await databaseConnect();
        if (mongoose.connection.readyState === 1) {
            console.log("Connected to the Mongo database.");
            for (const continent of continentNames) {
                const SourceModel = mongoose.model(`${continent}_model`, countrySchema, continent);
                const docs = await SourceModel.find({});
                console.log("docs:", docs);
                console.log(`Migrating ${docs.length} documents from ${continent}...`);
                const modifiedDocs = docs.map((doc) => {
                    const obj = doc.toObject();
                    obj.continent = continent;
                    delete obj._id; // Let MongoDB assign new _id in the new collection
                    return obj;
                });
                // console.log("modifiedDocs:", modifiedDocs);
                if (modifiedDocs.length > 0) {
                    await Country.insertMany(modifiedDocs);
                }
            }
            console.log("Migration complete");
        }
    } catch (error) {
        console.log("Something went wrong:", error);
    } finally {
        mongoose.disconnect();
        console.log("Disconnected from the DB.");
    }
})();
