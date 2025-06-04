const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const mongoose = require("mongoose");
// const CountrySchema = require("../models/Country"); // I want the continent model, not the country schema.

router.put("/update", jsonParser, async (req, res) => {
    console.log("This is a put request on the /update route.");

    const database = mongoose.connection.db;
    const result = await database
        .collection(req.body.continent)
        .updateOne({ _id: req.body.countryId }, [{ confidenceIndex: req.body.userConfidence }]);

    console.log("Update result:", result);

    console.log("Req:", req.body);
    res.json(req.body);
});

module.exports = router;
