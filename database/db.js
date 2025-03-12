// From the MongoDB setup:
const secrets = require("../secrets");
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://rhysjenkins89:${secrets.mongoPassword}@capital-cities-site.z6o7t.mongodb.net/?retryWrites=true&w=majority&appName=capital-cities-site`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

async function databaseConnect() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log(
            "Pinged your deployment. You successfully connected to MongoDB!"
        );
    } catch (error) {
        console.log("Connection failed.");
    }
    // finally {
    //     // Ensures that the client will close when you finish/error
    //     console.log("Closing the connection in the finally block.");
    //     await client.close();
    // }
}

module.exports = databaseConnect;
