const express = require("express");
const fs = require("fs");

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkID = (req, res, next, val) => {
    console.log(`Tour id is : ${val}`)

    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status : "Failed", 
            message: "Ivalid ID"
        });
    }
    next();
};

exports.checkBody = (req, res, next) => {
    if(!req.body.name || req.body.price) {
        return res.status(400).json({
            status: "Failed",
            message: "Missing name or price!"
        });
    }
    next();
};

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: "Success",
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

exports.getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  
  res.status(200).json({
    status: "Success",
    requestedAt: req.requestTime,
    data: {
      tour,
    },
  });
};

exports.createTour = (req, res) => {
  // Handles POST request to create a new tour
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "Success",
        requestedAt: req.requestTime,
        data: {
          tour: newTour,
        },
      });
    }
  );
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: "Success",
    data: {
        tour: "<Update tour here...>"
    }
  });
};

exports.deleteTour = (req, res) => {
  const id = req.params.id * 1;
  const tourIndex = tours.findIndex((el) => el.id === id);

  if (tourIndex === -1) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }

  tours.splice(tourIndex, 1);

  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(204).json({
        status: "success",
        data: null,
      });
    }
  );
};