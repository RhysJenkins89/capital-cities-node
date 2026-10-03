const express = require("express");
const cors = require("cors");
const app = express();
const databaseConnect = require("./database/database.js");
const cookieParser = require("cookie-parser");
const config = require("./config");

app.use(
  cors({
    origin: config.origin,
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
