
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

// const userData = require("./models/userModel");
 const authRouter = require("./routes/authRoutes");
// const productRouter = require("./routers/productRoute");

const app = express();

// Middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(cors());

// To convert req.body to JSON format
app.use(express.json());

app.use("/api/v1/auth",authRouter);
// app.use("/", productRouter);

//--------export module---------------

