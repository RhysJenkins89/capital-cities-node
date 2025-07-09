const express = require("express");
const router = express.Router();
const continentController = require("../controllers/continentController");

router.get("/:continent", continentController);

module.exports = router;
