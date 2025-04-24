const express = require("express");
const router = express.Router();

router.get("/:continent", (req, res) => {
    const continent = req.params.continent;
    res.send(continent);
});

module.exports = router;
