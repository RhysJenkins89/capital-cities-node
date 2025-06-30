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
    body("email").trim().isEmail().withMessage("Please enter a valid email address."),
    body("password")
        .trim()
        .notEmpty()
        .withMessage("Please enter a password.")
        .isLength({ min: 10 })
        .withMessage("Your password must contain at least ten characters.")
        .matches(/[A-Z]/)
        .withMessage("Your password must contain at least one uppercase letter.")
        .matches(/[a-z]/)
        .withMessage("Your password must contain at least one lowercase letter.")
        .matches(/[0-9]/)
        .withMessage("Your password must contain at least one number.")
        .matches(/[\W_]/)
        .withMessage("Your password must contain at least one special character.")
        .escape(),
    (req, res, next) => {
        const result = validationResult(req);
        if (result.isEmpty()) {
            next();
        } else {
            return res.status(400).json({ errors: result.array() });
        }
    },
];

module.exports = validateRegisterInput;
