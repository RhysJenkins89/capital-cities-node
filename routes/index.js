const express = require("express");
const router = express.Router();
const continentRoutes = require("./continent");
const updateRoute = require("./update");

router.use("/", continentRoutes, updateRoute);

module.exports = router;
