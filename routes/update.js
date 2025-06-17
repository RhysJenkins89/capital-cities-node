const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const updateController = require("../controllers/updateController");

router.put("/update", jsonParser, async (req, res) => {
    updateController(req, res);
});

module.exports = router;
