const mongoose = require("mongoose");
const CountrySchema = require("./Country");

const ContinentSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    countries: [CountrySchema],
});

module.exports = mongoose.model("Continent", ContinentSchema, "continents");
