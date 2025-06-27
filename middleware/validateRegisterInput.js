const { body, validationResult } = require("express-validator");

function validateRegisterInput(req, res, next) {
    console.log("This is the validateRegisterInput middleware function");
    const { firstName } = req.body;
    if (!firstName) {
        return res.status(400).json({ message: "The firstName field is required." });
    }
    next();
}

module.exports = validateRegisterInput;
