const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

UserSchema.pre("save", function (next) {
    // Do something here
    // I'll need to check the password here, or add another middleware layer
    next();
});

module.exports = mongoose.model("User", UserSchema);
