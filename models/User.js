const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: String,
    email: String,
    password: String,
});

module.exports = mongoose.model("User", UserSchema);
