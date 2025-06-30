async function registerController(req, res) {
    const { firstName, lastName, email, password } = req.body;
    console.log("firstName:", firstName);
    console.log("lasttName:", lastName);
    console.log("email:", email);
    console.log("password:", password);
    res.json({ message: "This is the registerController function" });
}

module.exports = registerController;
