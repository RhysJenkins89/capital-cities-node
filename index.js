const express = require("express");
const cors = require("cors");
const fs = require("fs").promises;
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
// For the moment, I've removed the following in order to test from my local machine: { origin: "https://cities.rhysjenkins.uk" }

app.get("/", (req, res) => {
    res.send("Hello World!");
});

async function readFileAsync(filePath) {
    try {
        const data = await fs.readFile(filePath, "utf8");
        return data;
    } catch (error) {
        throw error;
    }
}

app.get("/europeRandom", async (req, res) => {
    // The request needs to contain auth data
    try {
        const europeData = await readFileAsync("./data/europe.json");
        res.send(europeData);
    } catch (error) {
        throw error;
    }
});

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});
