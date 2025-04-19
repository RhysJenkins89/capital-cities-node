const express = require("express");
const cors = require("cors");
const fs = require("fs").promises;
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000;
const jsonParser = bodyParser.json();
// const secrets = require("./secrets");
const Register = require("./controllers/auth.js");
const Validate = require("./middleware/validate.js");
const { body, validationResult } = require("express-validator");
const databaseConnect = require("./database/db.js");
const mongoose = require("mongoose");
const CountrySchema = require("./models/Country.js");

// I'm trying what might be a more intuitive way of getting to the database here
// const { MongoClient } = require("mongodb");

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
// For the moment, I've removed the following in order to test from my local machine: { origin: "https://cities.rhysjenkins.uk" }

// Connect to the database
databaseConnect();

app.get("/", (req, res) => {
    res.send("Hello world!");
});

async function readFileAsync(filePath) {
    try {
        const data = await fs.readFile(filePath, "utf8");
        return data;
    } catch (error) {
        throw error;
    }
}

app.post(
    "/signup",
    jsonParser,
    [
        body("firstName")
            .trim() // Always call .trim before calling .notEmpty in order to remove whitespace before checking if the field is empty
            .notEmpty()
            .withMessage("The first name field is required")
            .isAlpha("en-GB", { ignore: " -'" }) // This string allows spaces, hyphens, and apostrophes
            .withMessage(
                "The first name field must contain only letters, spaces, hyphens, or apostrophes"
            )
            .escape(),
        body("lastName")
            .trim()
            .notEmpty()
            .withMessage("The last name field is required")
            .isAlpha("en-GB", { ignore: " -'" })
            .withMessage(
                "The last name field must contain only letters, spaces, hyphens, or apostrophes"
            )
            .escape(),
        body("email")
            .trim()
            .isEmail()
            .withMessage("Please enter a valid email address."),
        body("password")
            .trim()
            .notEmpty()
            .withMessage("Please enter a password.")
            .isLength({ min: 10 })
            .withMessage("Your password must contain at least ten characters.")
            .matches(/[A-Z]/)
            .withMessage(
                "Your password must contain at least one uppercase letter."
            )
            .matches(/[a-z]/)
            .withMessage(
                "Your password must contain at least one lowercase letter."
            )
            .matches(/[0-9]/)
            .withMessage("Your password must contain at least one number.")
            .matches(/[\W_]/)
            .withMessage(
                "Your password must contain at least one special character."
            )
            .escape(),
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        } else {
            Register(req, res);
        }
    }
);

// What is a schema?
// A schema defines the structure of your collection documents. A Mongoose schema maps directly to a MongoDB collection.
// const countrySchema = new mongoose.Schema({
//     capital: String,
//     definiteArticle: Boolean,
// });

// const ContinentsModel = mongoose.model("continent", countrySchema);

// const countries = ContinentsModel.findOne()

app.get("/europe", async (req, res) => {
    try {
        const databasePassword = process.env.mongoPassword;
        const uri = `mongodb+srv://rhysjenkins89:${databasePassword}@capital-cities-site.z6o7t.mongodb.net/continents?retryWrites=true&w=majority&appName=capital-cities-site`;
        const continentsConnection = mongoose.createConnection(uri);
        await continentsConnection.asPromise();
        const EuropeModel = continentsConnection.model(
            "Europe",
            CountrySchema,
            "europe"
        );
        const countries = await EuropeModel.find().lean(); // .lean() is a mongoose method that omits the built-in methods and properties on a mongose document, returning instead a POJO. The delete keyword, below, doesn't work on a mongoose document.
        delete countries[0]._id;
        res.send(countries[0]);
    } catch (error) {
        throw error;
    }
});

app.get("/asia", async (req, res) => {
    try {
        const asiaData = await readFileAsync("./data/asia.json");
        res.send(asiaData);
    } catch (error) {
        throw error;
    }
});

app.get("/africa", async (req, res) => {
    try {
        const databasePassword = process.env.mongoPassword;
        const uri = `mongodb+srv://rhysjenkins89:${databasePassword}@capital-cities-site.z6o7t.mongodb.net/continents?retryWrites=true&w=majority&appName=capital-cities-site`;
        const continentsConnection = mongoose.createConnection(uri);
        await continentsConnection.asPromise();
        const AfricaModel = continentsConnection.model(
            "Africa",
            CountrySchema,
            "africa"
        );
        const countries = await AfricaModel.find().lean(); // .lean() is a mongoose method that omits the built-in methods and properties on a mongose document, returning instead a POJO. The delete keyword, below, doesn't work on a mongoose document.
        delete countries[0]._id;
        res.send(countries[0]);
    } catch (error) {
        throw error;
    }
});

app.get("/north-america", async (req, res) => {
    try {
        const northAmericaData = await readFileAsync(
            "./data/north-america.json"
        );
        res.send(northAmericaData);
    } catch (error) {
        throw error;
    }
});

app.get("/oceania", async (req, res) => {
    try {
        const oceaniaData = await readFileAsync("./data/oceania.json");
        res.send(oceaniaData);
    } catch (error) {
        throw error;
    }
});

app.get("/south-america", async (req, res) => {
    try {
        const southAmericaData = await readFileAsync(
            "./data/south-america.json"
        );
        res.send(southAmericaData);
    } catch (error) {
        throw error;
    }
});

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});

// Building login functionality here for the moment
const jwt = require("jsonwebtoken");
const User = require("./models/User.js");
const bcrypt = require("bcrypt");
// const { default: mongoose } = require("mongoose");

const JWT_SECRET = process.env.JWT_SECRET || "secret-key";

app.post("/login", jsonParser, async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email }).select("+password"); // mongoose excludes the password field by default
        if (!user) {
            return res.status(400).json({ error: "User not found." });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ error: "invalid credentials." });
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
            expiresIn: "1h",
        });

        res.json({ token, user });
    } catch (error) {
        res.status(500).json({
            error: { message: error.message, stack: error.stack },
        });
    }
});
