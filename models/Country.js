const mongoose = require("mongoose");

const CountrySchema = new mongoose.Schema({
    name: String,
    capital: String,
    continent: String,
    definiteArticle: Boolean,
    confidenceIndex: Number,
});

module.exports = mongoose.model("Country", CountrySchema);
