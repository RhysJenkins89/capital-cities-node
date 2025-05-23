const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
// const CountrySchema = require("../models/Country"); // I want the continent model, not the country schema.

router.put("/update", jsonParser, async (req, res) => {
    console.log("This is a put request on the /update route.");
    // console.log("Req:", req.body);
    console.log("Res:", res.body);
    res.json(res.body);
});

module.exports = router;
