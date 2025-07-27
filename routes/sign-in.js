const express = require("express");
const router = express.Router();
const jsonParser = require("body-parser").json();
const signInController = require("../controllers/sign-in-controller");

router.post("/signin", jsonParser, signInController);

module.exports = router;
