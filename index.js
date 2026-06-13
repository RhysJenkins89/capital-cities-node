const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
const databaseConnect = require("./database/database.js");
const cookieParser = require("cookie-parser");

const allowedOrigins = ["http://localhost:5173", "https://cities.rhysjenkins.uk"]; // I should change this. The allowedOrigins variable should be populated depending on whether or not I am in dev mode.

const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
};

app.use(cors(corsOptions));

app.use(cookieParser());

databaseConnect();

const routes = require("./routes");

app.use("/", routes);

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});
