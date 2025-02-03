const express = require("express");
const fs = require("fs").promises;
const app = express();
const port = process.env.PORT || 3000;

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
        console.log("europe data: ", europeData);
        res.send(europeData);
    } catch (error) {
        throw error;
    }
});

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});
