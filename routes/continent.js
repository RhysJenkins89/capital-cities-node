const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const CountrySchema = require("../models/Country");
const capitaliseFirstLetter = require("../utils/capitaliseFirstLetter");

const validContinentRoutes = [
    "europe",
    "asia",
    "africa",
    "north-america",
    "south-america",
    "oceania",
];

router.get("/:continent", async (req, res) => {
    const continentName = req.params.continent;

    if (!validContinentRoutes.includes(continentName)) {
        return res.status(400).json({ error: `Incorrect continent route: '${continentName}'` });
    }

    try {
        const modelName = capitaliseFirstLetter(continentName);

        const ContinentModel =
            mongoose.models[modelName] || mongoose.model(modelName, CountrySchema, continentName);

        const countries = await ContinentModel.find().lean();

        res.send(countries);
    } catch (error) {
        console.error("Error fetching countries:", error);
        res.status(500).send("Server error");
    }
});

module.exports = router;
