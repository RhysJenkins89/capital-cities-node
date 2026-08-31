const express = require("express");
const router = express.Router();
const jsonParser = require("body-parser").json();
const emailController = require("../controllers/email-test");

router.get("/email", jsonParser, emailController);

module.exports = router;
