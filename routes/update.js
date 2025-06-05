const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const mongoose = require("mongoose");
const CountrySchema = require("../models/Country"); // I want the continent model, not the country schema.
const capitaliseFirstLetter = require("../utils/capitaliseFirstLetter");

router.put("/update", jsonParser, async (req, res) => {
    const continentName = req.body.continent;
    countryId = req.body.countryId;
    userConfidence = req.body.userConfidence;
    console.log("This is a put request on the /update route.");
    console.log("Req:", req.body);

    // const database = mongoose.connection.db;
    // const result = await database
    //     .collection(req.body.continent)
    //     .updateOne({ _id: req.body.countryId }, [{ confidenceIndex: req.body.userConfidence }]);
    // const document = await database.collection(req.body.continent);

    const ContinentModel = mongoose.model(
        capitaliseFirstLetter(continentName),
        CountrySchema,
        continentName
    );

    const document = await ContinentModel.findById(countryId);
    document.confidenceIndex = userConfidence;
    console.log("document:", document);
    const updatedDocument = await document.save();
    console.log("Updated document:", updatedDocument);

    res.json(req.body);

    // const doc = await Model.findById(id);
    // doc.name = "jason bourne";
    // await doc.save();
});

module.exports = router;
