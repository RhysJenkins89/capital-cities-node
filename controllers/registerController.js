const { body, validationResult } = require("express-validator");

async function registerController(req, res) {
    console.log("This is the registerController function");
    console.log("req:", req.body);

    body("firstName")
        .trim()
        .notEmpty()
        .withMessage("The first name field is required")
        .isAlpha("en-GB", { ignore: " -'" }) // This string allows spaces, hyphens, and apostrophes
        .withMessage(
            "The first name field must contain only letters, spaces, hyphens, or apostrophes"
        )
        .escape();

    const result = validationResult(req);
    console.log("result:", result);

    if (result.isEmpty()) {
        res.json({ message: "No errors found." });
    } else {
        res.status(400).json({ errors: result.array() });
    }
}

module.exports = registerController;
