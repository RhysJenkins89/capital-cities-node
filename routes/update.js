const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const mongoose = require("mongoose");
const CountrySchema = require("../models/Country"); // I want the continent model, not the country schema.
const capitaliseFirstLetter = require("../utils/capitaliseFirstLetter");

router.put("/update", jsonParser, async (req, res) => {
    try {
        const { continent, countryId, userConfidence } = req.body;
        if (!continent || !countryId || userConfidence === undefined) {
            return res.status(400).json({ error: "Missing required fields." });
        }

        const CountrySchema = new mongoose.Schema({
            name: String,
            capital: String,
            definiteArticle: Boolean,
            confidenceIndex: Number,
        });

        const ContinentModel = mongoose.model(
            capitaliseFirstLetter(continent),
            CountrySchema,
            continent
        );
        const document = await ContinentModel.findById(countryId);
        if (!document) {
            return res.status(404).json({ error: "Document not found." });
        }
        document.confidenceIndex = userConfidence;
        const updatedDocument = await document.save();
        return res.status(200).json({
            message: "Document updated successfully.",
            data: updatedDocument,
        });
    } catch (error) {
        console.error("Update error: ", error);
        res.status(500).json({ error: "Internal server error." });
    }
});

module.exports = router;
