const express = require("express");
const router = express.Router();
const CountrySchema = require("../models/Country"); // I want the continent model, not the country schema.

router.put("/update", async (req, res) => {
    console.log("This is a put request on the /update route.");
    res.json(res.body);
});

module.exports = router;
