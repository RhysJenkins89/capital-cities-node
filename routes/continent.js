const express = require("express");
const router = express.Router();
const continentController = require("../controllers/continent-controller");

router.get("/:continent", continentController);

module.exports = router;
