// This scripts adds a confidenceIndex property to each document in each collection in the continents database.

const mongoose = require("mongoose");
const databaseConnect = require("../database/db");

(async () => {
    try {
        await databaseConnect();
        if (mongoose.connection.readyState === 1) {
            console.log("Connected to the Mongo database.");
            const database = mongoose.connection.db;
            const collections = await database.listCollections().toArray();

            for (const continentCollection of collections) {
                console.log(`Updating ${continentCollection.name}`);
                const result = await database
                    .collection(continentCollection.name)
                    .updateMany({}, [{ $set: { confidenceIndex: 1 } }]);
                console.log(
                    `Updated ${result.modifiedCount} documents on the ${continentCollection.name} collection.`
                );
            }
        }
    } catch (error) {
        console.log("Something went wrong:", error);
    } finally {
        mongoose.disconnect();
        console.log("Disconnected from the DB.");
    }
})();
