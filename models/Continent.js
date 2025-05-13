const mongoose = require("mongoose");

const CountrySchema = new mongoose.Schema({
    name: String,
    capital: String,
    definiteArticle: Boolean,
});

module.exports = mongoose.model("Continent", CountrySchema);
