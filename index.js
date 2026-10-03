const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
const databaseConnect = require("./database/database.js");
const cookieParser = require("cookie-parser");

const allowedOrigin =
  process.env.NODE_ENV === "production" ? "https://cities.rhysjenkins.uk" : "http://localhost:5173";

app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
  }),
);

app.use(cookieParser());

databaseConnect();

const routes = require("./routes");

app.use("/", routes);

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
