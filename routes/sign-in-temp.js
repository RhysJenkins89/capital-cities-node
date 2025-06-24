// app.post(
//     "/signup",
//     jsonParser,
//     [
//         body("firstName")
//             .trim() // Always call .trim before calling .notEmpty in order to remove whitespace before checking if the field is empty
//             .notEmpty()
//             .withMessage("The first name field is required")
//             .isAlpha("en-GB", { ignore: " -'" }) // This string allows spaces, hyphens, and apostrophes
//             .withMessage(
//                 "The first name field must contain only letters, spaces, hyphens, or apostrophes"
//             )
//             .escape(),
//         body("lastName")
//             .trim()
//             .notEmpty()
//             .withMessage("The last name field is required")
//             .isAlpha("en-GB", { ignore: " -'" })
//             .withMessage(
//                 "The last name field must contain only letters, spaces, hyphens, or apostrophes"
//             )
//             .escape(),
//         body("email")
//             .trim()
//             .isEmail()
//             .withMessage("Please enter a valid email address."),
//         body("password")
//             .trim()
//             .notEmpty()
//             .withMessage("Please enter a password.")
//             .isLength({ min: 10 })
//             .withMessage("Your password must contain at least ten characters.")
//             .matches(/[A-Z]/)
//             .withMessage(
//                 "Your password must contain at least one uppercase letter."
//             )
//             .matches(/[a-z]/)
//             .withMessage(
//                 "Your password must contain at least one lowercase letter."
//             )
//             .matches(/[0-9]/)
//             .withMessage("Your password must contain at least one number.")
//             .matches(/[\W_]/)
//             .withMessage(
//                 "Your password must contain at least one special character."
//             )
//             .escape(),
//     ],
//     (req, res) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array() });
//         } else {
//             Register(req, res);
//         }
//     }
// );
