const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

//const userData = require("./models/authModel");
const authRouter = require("./routes/authRoutes");
const globalErrorHandler = require("./controllers/errorController");

const app = express();

// Middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(cors());

// To convert req.body to JSON format
app.use(express.json());

app.use("/api/v1/auth", authRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`));
});

app.use(globalErrorHandler);

//--------export module---------------
module.exports = app;
