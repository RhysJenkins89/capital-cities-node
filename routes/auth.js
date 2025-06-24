const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.get("/signup", async (req, res) => {
    authController(req, res);
});

module.exports = router;
