// This scripts checks that the database is working correctly. I open a connection to the database, get all of the countries, print them to the console, and then close the connection.

const mongoose = require("mongoose");
const CountryModel = require("../models/Country");
const databaseConnect = require("../database/db");

(async () => {
    try {
        await databaseConnect();
        if (mongoose.connection.readyState === 1) {
            const countries = await CountryModel.find({});
            console.log("Countries:", countries);
        }
    } catch (error) {
        console.error("Connection error:", error);
    } finally {
        await mongoose.disconnect();
    }
})();
