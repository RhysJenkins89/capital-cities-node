const { body, validationResult } = require("express-validator");

const validateRegisterInput = [
    body("firstName")
        .trim()
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
        .withMessage("The first name field is required")
        .isAlpha("en-GB", { ignore: " -'" })
        .withMessage(
            "The first name field must contain only letters, spaces, hyphens, or apostrophes"
        )
        .escape(),
    (req, res, next) => {
        const result = validationResult(req);
        console.log("result:", result);

        if (result.isEmpty()) {
            console.log("No errors found.");
            next();
        } else {
            return res.status(400).json({ errors: result.array() });
        }
    },
];

module.exports = validateRegisterInput;
