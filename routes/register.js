const express = require("express");
const router = express.Router();
const registerController = require("../controllers/registerController");

router.post("/register", async (req, res) => {
    registerController(req, res);
});

module.exports = router;
