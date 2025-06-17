const CountryModel = require("../models/Country");

const validContinentRoutes = [
    "europe",
    "asia",
    "africa",
    "north-america",
    "south-america",
    "oceania",
];

async function continentController(req, res) {
    const continentName = req.params.continent;
    if (!validContinentRoutes.includes(continentName)) {
        return res.status(400).json({ error: `Incorrect continent route: '${continentName}'` });
    }
    try {
        const countries = await CountryModel.find({ continent: continentName });
        res.send(countries);
    } catch (error) {
        console.error("Error fetching data:", error);
        return res.status(500).json({
            error: error,
            message: "Server error",
        });
    }
}

module.exports = continentController;
