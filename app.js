const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

// const userData = require("./models/userModel");
// const userRouter = require("./routers/userRoute");
// const productRouter = require("./routers/productRoute");

const app = express();

// Middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(cors());

// To convert req.body to JSON format
app.use(express.json());

// app.use("/", userRouter);
// app.use("/", productRouter);

//--------export module---------------
