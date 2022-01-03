const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const AppError = require(`${__dirname}/utils/appError`);
const authRouter = require(`${__dirname}/routes/authRoutes`);
const toppingsRouter = require(`${__dirname}/routes/toppingsRoutes`);
const pizzaRouter = require(`${__dirname}/routes/pizzaRoutes`);
const globalErrorHandler = require(`${__dirname}/controllers/errorController`);

const app = express();

// Middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(cors());

// To convert req.body to JSON format
app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/topping", toppingsRouter);
app.use("/api/v1/pizza", pizzaRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`));
});

app.use(globalErrorHandler);

//--------export module---------------
module.exports = app;
