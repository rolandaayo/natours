const fs = require("fs");
const express = require("express");

const app = express();
app.use(express.json()); // for parsing application/ serves as middleware

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get("/api/v1/tours", (req, res) => { // Handles GET request to retrieve all tours
    res.status(200).json({
        status: "success",
        results: tours.length,
        data: {
            tours,
        }
    })
});

app.get("/api/v1/tours/:id", (req, res) => { // Handles Get request to retrieve a single tour

})

app.post("/api/v1/tours", (req, res) => { // Handles POST request to create a new tour
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({ id: newId }, req.body);
    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours), err => {
        res.status(201).json({ 
            status: "success", 
            data: {
                tour: newTour
            }   
        })
    })
    res.send("Added new tour!");
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is active on port ${port}!`);
});