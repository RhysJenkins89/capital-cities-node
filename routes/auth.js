const express = require("express");
const router = express.Router();
// const jsonParser = require("body-parser").json();
const cookieParser = require("cookie-parser");
const authoriseUser = require("../middleware/authorise-user");

router.get("/auth", cookieParser, authoriseUser, (req, res) => {
    res.json({
        userData: req.user,
    });
});

module.exports = router;
