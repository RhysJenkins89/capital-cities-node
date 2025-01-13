const express = require("express");
const fs = require("fs");
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/europeRandom", (req, res) => {
    // res.send("This is the europeRandom route.");
    let europeRandomData;
    fs.readFile("./data/europe.json", "utf8", (error, data) => {
        if (error) {
            console.error(error);
            return;
        }
        // console.log(data);
        europeRandomData = data;
    });
    console.log(europeRandomData); // Undefined
    res.send(europeRandomData); // Undefined
});

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});
