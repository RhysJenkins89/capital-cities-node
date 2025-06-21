const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
const databaseConnect = require("./database/db.js");

const allowedOrigins = ["http://localhost:5173", "https://cities.rhysjenkins.uk"];

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

databaseConnect();

const routes = require("./routes");

app.use("/", routes);

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});
