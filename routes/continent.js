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
        return res.status(400).json({ error: `Invalid continent: '${continentName}'` });
    }

    try {
        const modelName = capitaliseFirstLetter(continentName);

        const ContinentModel =
            mongoose.models[modelName] || mongoose.model(modelName, CountrySchema, continentName);

        const countries = await ContinentModel.find().lean();

        // My theory: mongoose is searching for the collection. It doesn't exist. Instead of sending back an error, it creates the collection and sends back the data, which in this case is an empty array.

        res.send(countries);
    } catch (error) {
        console.error("Error fetching countries:", error);
        res.status(500).send("Server error");
    }
});

module.exports = router;

// Using Insomnia, I sent a get request to the /ocenia route, which is a typo. The correct route is oceania. Doing so posted an empty collection to my MongoDB. What is going on?
// Moreover, hitting an undefined route with a get request returns an empty array, instead of a properly handled error.
// This is it: somehow, the get request is posting to my MongoDB. This is weird.
