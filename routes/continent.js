const express = require("express");
const router = express.Router();
const continentController = require("../controllers/continentController");

router.get("/:continent", async (req, res) => {
    continentController(req, res);
});

module.exports = router;
