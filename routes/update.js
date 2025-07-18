const express = require("express");
const router = express.Router();
const jsonParser = require("body-parser").json();
const updateController = require("../controllers/update-controller");

router.put("/update", jsonParser, updateController);

module.exports = router;
