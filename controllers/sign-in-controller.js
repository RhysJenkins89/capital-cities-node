async function signInController(req, res) {
    console.log("This is the signInController function.");
    return res.json({ message: "This is the signInController function." });
}

module.exports = signInController;
