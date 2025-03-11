const express = require("express");
const cors = require("cors");
const fs = require("fs").promises;
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000;
const jsonParser = bodyParser.json();
const secrets = require("./secrets");
const Register = require("./controllers/auth.js");
const Validate = require("./middleware/validate.js");
const { body, validationResult } = require("express-validator");

app.use(cors());
// For the moment, I've removed the following in order to test from my local machine: { origin: "https://cities.rhysjenkins.uk" }

app.get("/", (req, res) => {
    res.send("Hello world!");
});

console.log("Password:", secrets.mongoPassword);

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
            .trim()
            .notEmpty()
            .withMessage("Last name is required")
            .isAlpha("en-GB", { ignore: " -'" })
            .withMessage(
                "Last name must contain only letters, spaces, hyphens, or apostrophes"
            )
            .escape(),
        body("lastName")
            .trim()
            .notEmpty()
            .withMessage("Last name is required")
            .isAlpha("en-GB", { ignore: " -'" })
            .withMessage(
                "Last name must contain only letters, spaces, hyphens, or apostrophes"
            )
            .escape(),
        body("email")
            .trim()
            .isEmail()
            .withMessage("Please enter a valid email address."),
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        } else {
            res.send({
                message: "Inputs valid",
                body: req.body,
            });
        }
    }
);

// app.post(
//     "/register",
//     check("email")
//         .isEmail()
//         .withMessage("Enter a valid email address")
//         .normalizeEmail(),
//     check("first_name")
//         .not()
//         .isEmpty()
//         .withMessage("Your first name is required")
//         .trim()
//         .escape(),
//     check("last_name")
//         .not()
//         .isEmpty()
//         .withMessage("Your last name is required")
//         .trim()
//         .escape(),
//     check("password")
//         .notEmpty()
//         .isLength({ min: 8 })
//         .withMessage("Must be at least 8 chars long"),
//     Validate,
//     Register
// );

app.get("/europe", async (req, res) => {
    try {
        const europeData = await readFileAsync("./data/europe.json");
        res.send(europeData);
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
        const africaData = await readFileAsync("./data/africa.json");
        res.send(africaData);
    } catch (error) {
        throw error;
    }
});

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});

// From the MongoDB setup:

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://rhysjenkins89:${secrets.mongoPassword}@capital-cities-site.z6o7t.mongodb.net/?retryWrites=true&w=majority&appName=capital-cities-site`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log(
            "Pinged your deployment. You successfully connected to MongoDB!"
        );
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);
