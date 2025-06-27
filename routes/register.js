const express = require("express");
const router = express.Router();
const jsonParser = require("body-parser").json();
const validateRegisterInput = require("../middleware/validateRegisterInput");
const registerController = require("../controllers/registerController");

router.post("/register", jsonParser, validateRegisterInput, registerController);

module.exports = router;
