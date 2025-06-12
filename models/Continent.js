const mongoose = require("mongoose");

const CountrySchema = new mongoose.Schema({
    name: String,
    capital: String,
    definiteArticle: Boolean,
    confidenceIndex: Number,
});

const ContinentSchema = new mongoose.Schema({
    // name: { type: String, required: true },
    countries: [CountrySchema],
});

module.exports = mongoose.model("Continent", ContinentSchema);
