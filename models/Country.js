const mongoose = require("mongoose");

const CountrySchema = new mongoose.Schema({
    name: String,
    capital: String,
    definiteArticle: Boolean,
});

module.exports = CountrySchema; // Should I export a model here? At the moment I only export the schema.
