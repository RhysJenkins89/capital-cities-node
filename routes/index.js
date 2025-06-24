const express = require("express");
const router = express.Router();
const continentRoutes = require("./continent");
const updateRoute = require("./update");
const authRoute = require("./auth");

router.use("/", authRoute, continentRoutes, updateRoute);

module.exports = router;
