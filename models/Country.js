const mongoose = require("mongoose");

const CountrySchema = new mongoose.Schema({
    capital: String,
    definiteArticle: Boolean,
});

module.exports = CountrySchema;
