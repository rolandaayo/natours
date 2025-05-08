const express = require("express");
const fs = require("fs");

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
  );

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
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
  if (!tour) {
    return res.status(404).json({
      status: "failed",
      message: "Invalid ID",
    });
  }
  res.status(200).json({
    status: "success",
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
        status: "success",
        requestedAt: req.requestTime,
        data: {
          tour: newTour,
        },
      });
    }
  );
};

exports.updateTour = (req, res) => {
  // Handles PATCH request to update a specific tour by ID
  const id = req.params.id * 1;
  const tourIndex = tours.findIndex((el) => el.id === id);

  if (tourIndex === -1) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }

  tours[tourIndex] = { ...tours[tourIndex], ...req.body };

  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(200).json({
        status: "success",
        requestedAt: req.requestTime,
        data: {
          tour: tours[tourIndex],
        },
      });
    }
  );
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