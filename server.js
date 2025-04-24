const fs = require("fs");
const express = require("express");

const app = express();
app.use(express.json()); //middleware

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get("/api/v1/tours", (req, res) => { //get request - to get all information
    res.status(200).json({
        status: "success",
        results: tours.length,
        data: {
            tours,
        }
    })
});

app.post("/api/v1/tours", (req, res) => { // post request - to add new data
    console.log(req.body);
    res.send("Done!");
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is active on port ${port}!`);
});