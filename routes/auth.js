const express = require("express");
const router = express.Router();
// const jsonParser = require("body-parser").json();
const authoriseUser = require("../middleware/authorise-user");

router.get("/auth", authoriseUser, (req, res) => {
    res.json({
        userData: req.user,
    });
});

module.exports = router;
