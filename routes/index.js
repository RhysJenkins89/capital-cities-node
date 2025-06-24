const express = require("express");
const router = express.Router();
const continentRoutes = require("./continent");
const updateRoute = require("./update");
const registerRoute = require("./register");

router.use("/", registerRoute, continentRoutes, updateRoute);

module.exports = router;
