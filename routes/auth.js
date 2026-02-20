const express = require("express");
const router = express.Router();
const authoriseUser = require("../middleware/authorise-user");

router.get("/auth", authoriseUser, (req, res) => {
    res.json({
        message: "This is a test response.",
        userData: req.user,
    });
});

module.exports = router;

// cookieParser, authoriseUser,
