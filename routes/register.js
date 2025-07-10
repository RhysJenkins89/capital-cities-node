const express = require("express");
const router = express.Router();
const jsonParser = require("body-parser").json();
const validateRegisterInput = require("../middleware/validate-register-input");
const registerController = require("../controllers/register-controller");

router.post("/register", jsonParser, validateRegisterInput, registerController);

module.exports = router;
