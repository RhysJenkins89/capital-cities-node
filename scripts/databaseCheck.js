const mongoose = require("mongoose");
require("dotenv").config();
const databasePassword = process.env.mongoPassword;
const uri = `mongodb+srv://rhysjenkins89:${databasePassword}@capital-cities-site.z6o7t.mongodb.net/countriesDatabase?retryWrites=true&w=majority&appName=capital-cities-site`;
const CountryModel = require("../models/Country");

(async () => {
    try {
        await mongoose.connect(uri);
        if (mongoose.connection.readyState === 1) {
            const countries = await CountryModel.find({});
            // console.log("Countries:", countries);

            // const modifiedCountries = countries.map((country) => {
            //     const countryObject = country.toObject();
            //     delete countryObject.__v;
            //     return countryObject;
            // });

            // if (modifiedCountries.length > 0) {
            //     await CountryModel.insertMany(modifiedCountries);
            // }

            // const docs = await SourceModel.find({});
            // console.log(`Migrating ${docs.length} from ${continent}`);
            // const modifiedDocs = docs.map((doc) => {
            //     const obj = doc.toObject();
            //     obj.continent = continent;
            //     delete obj._id; // Avoid _id conflict
            //     return obj;
            // });
            // if (modifiedDocs.length > 0) {
            //     await TargetCountry.insertMany(modifiedDocs);
            // }
        }
    } catch (error) {
        console.error("Connection error:", error);
    } finally {
        await mongoose.close();
    }
})();
