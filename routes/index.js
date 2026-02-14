const express = require("express");
const router = express.Router();
const continentRoutes = require("./continent");
const updateRoute = require("./update");
const registerRoute = require("./register");
const signInRoute = require("./sign-in");
const signOutRoute = require("./sign-out");

router.use("/", signInRoute, signOutRoute, registerRoute, continentRoutes, updateRoute);

module.exports = router;
