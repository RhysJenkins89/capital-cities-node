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
const databaseConnect = require("./database/db.js");

app.use(cors());
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

// Building login functionality here for the moment
const jwt = require("jsonwebtoken");
const User = require("./models/User.js");
const bcrypt = require("bcrypt");

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

        res.json({ token, userId: user._id });
    } catch (error) {
        res.status(500).json({
            error: { message: error.message, stack: error.stack },
        });
    }
});
