const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000;
const jsonParser = bodyParser.json();
const mongoose = require("mongoose");
const CountrySchema = require("./models/Country.js");

const allowedOrigins = [
    "http://localhost:5173",
    "https://cities.rhysjenkins.uk",
];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
};

app.use(cors(corsOptions));

// This database connection needs to be global
const databasePassword = process.env.mongoPassword;
const uri = `mongodb+srv://rhysjenkins89:${databasePassword}@capital-cities-site.z6o7t.mongodb.net/continents?retryWrites=true&w=majority&appName=capital-cities-site`;
const continentsConnection = mongoose.createConnection(uri);

const routes = require("./routes");

app.use("/", routes);

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});
