const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const config = require("./config/config");
const routes = require("./routes");

const app = express();

app.use(
  cors({
    origin: config.corsOrigin,
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());
app.use("/", routes);

module.exports = app;
