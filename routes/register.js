const express = require("express");
const router = express.Router();
const jsonParser = require("body-parser").json();
const registerController = require("../controllers/registerController");

router.post("/register", jsonParser, async (req, res) => {
    registerController(req, res);
});

module.exports = router;
