const express = require("express");
const router = express.Router();
const jsonParser = require("body-parser").json();
const signOutController = require("../controllers/sign-out-controller");

router.post("/signout", jsonParser, signOutController);

module.exports = router;
