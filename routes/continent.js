const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const ContinentModel = require("../models/Continent");
const capitaliseFirstLetter = require("../utils/capitaliseFirstLetter");

router.get("/:continent", async (req, res) => {
    const continentName = req.params.continent;
    // const databasePassword = process.env.mongoPassword;
    // const uri = `mongodb+srv://rhysjenkins89:${databasePassword}@capital-cities-site.z6o7t.mongodb.net/continents?retryWrites=true&w=majority&appName=capital-cities-site`;
    // const continentsConnection = mongoose.createConnection(uri);

    // Continent model
    // const ContinentModel = mongoose.model(
    //     capitaliseFirstLetter(continentName),
    //     CountrySchema,
    //     continentName
    // ); // It's this that I'll need to store in a different file and import.

    // Europe model
    // const EuropeModel = continentsConnection.model(
    //     "Europe",
    //     CountrySchema,
    //     "europe"
    // );
    const countries = await ContinentModel.find().lean();
    res.send(countries);

    // const countries = await ContinentModel.findOne({ name: continentName });
    // console.log("countries:", countries);
    // res.json(countries);

    //         const EuropeModel = continentsConnection.model(
    //             "Europe",
    //             CountrySchema,
    //             "europe"
    //         );
    //         const countries = await EuropeModel.find().lean(); // .lean() is a mongoose method that omits the built-in methods and properties on a mongose document, returning instead a POJO. The delete keyword, below, doesn't work on a mongoose document.
    //         countries.forEach((country) => {
    //             delete country._id;
    //         });
    //         res.send(countries);
    //     } catch (error) {
    //         throw error;
    //     }
});

module.exports = router;
