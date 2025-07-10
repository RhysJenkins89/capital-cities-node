const express = require("express");
const router = express.Router();
const continentRoutes = require("./continent");
const updateRoute = require("./update");
const registerRoute = require("./register");
const signInRoute = require("./sign-in");

router.use("/", signInRoute, registerRoute, continentRoutes, updateRoute);

module.exports = router;
