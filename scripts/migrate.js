// This script updates my MongoDB structure. From multiple continent collections, I'll go to a single countries collection. Each country document will feature a continent property.

const mongoose = require("mongoose");
// const databaseConnect = require("../database/db");

const continentNames = ["europe", "africa", "asia", "north-america", "south-america", "oceania"];

const countrySchema = new mongoose.Schema({}, { strict: false });
const Country = mongoose.model("Country", countrySchema, "countries");
const databasePassword = process.env.mongoPassword;

(async () => {
    try {
        const sourceDatabase = await mongoose.createConnection(
            `mongodb+srv://rhysjenkins89:${databasePassword}@capital-cities-site.z6o7t.mongodb.net/continents?retryWrites=true&w=majority&appName=capital-cities-site`
        );
        const targetDatabase = await mongoose.createConnection(
            `mongodb+srv://rhysjenkins89:${databasePassword}@capital-cities-site.z6o7t.mongodb.net/countriesDatabase?retryWrites=true&w=majority&appName=capital-cities-site`
        );
        const TargetCountry = targetDatabase.model(
            "Country",
            new mongoose.Schema({
                name: String,
                capital: String,
                definiteArticle: Boolean,
                continent: String,
                confidenceIndex: Number,
            })
        );
        for (const continent of continentNames) {
            const SourceModel = sourceDatabase.model(
                `${continent}_model`,
                countrySchema,
                continent
            );
            const docs = await SourceModel.find({});
            console.log(`Migrating ${docs.length} from ${continent}`);
            const modifiedDocs = docs.map((doc) => {
                const obj = doc.toObject();
                obj.continent = continent;
                delete obj._id; // Avoid _id conflict
                return obj;
            });
            if (modifiedDocs.length > 0) {
                await TargetCountry.insertMany(modifiedDocs);
            }
        }
        console.log("Migration complete.");
    } catch (error) {
        console.log("Something went wrong:", error);
    } finally {
        await sourceDatabase.close();
        await targetDatabase.close();
        console.log("Disconnected from the DB.");
    }
})();
