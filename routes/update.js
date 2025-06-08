const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const mongoose = require("mongoose");
const CountrySchema = require("../models/Country"); // I want the continent model, not the country schema.
const ContinentModelTest = require("../models/Continent");
const capitaliseFirstLetter = require("../utils/capitaliseFirstLetter");
const updateController = require("../controllers/updateController");

router.put("/update", jsonParser, async (req, res) => {
    // Remember to move this functionality into a controller
    updateController();
    try {
        const { continent, countryId, userConfidence } = req.body;
        if (!continent || !countryId || userConfidence === undefined) {
            return res.status(400).json({ error: "Missing required fields." });
        }

        // const continent = await Continent.findOneAndUpdate(
        //     { name: continent, "countries._id": countryId },
        //     { $set: { "countries.$.confidenceIndex": userConfidence } },
        //     { new: true }
        // );

        const continentDB = await ContinentModelTest.findOne({ continent });
        console.log("ContinentModelTest: ", ContinentModelTest.findOne({}));
        console.log("continentDB: ", continentDB);

        //
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
