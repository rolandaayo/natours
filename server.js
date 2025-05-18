const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();
dotenv.config({ path: "./config.env" });

// MIDDLEWARES

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log("Hello from the middleware 👋🏼");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// ROUTES
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

// NODE ENVIRONMENT VARIABLES
// console.log(process.env)

// START SERVER
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is active on port ${port}!😇`);
});
