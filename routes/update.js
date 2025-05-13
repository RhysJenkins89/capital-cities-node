const express = require("express");
const router = express.Router();
const CountrySchema = require("../models/Continent"); // I want the continent model, not the country schema.

router.post("/update", async (req, res) => {
    console.log("This is a post request on the /update route.");
    res.send("Route hit.");
});

module.exports = router;
