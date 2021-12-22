const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = require("./app");
dotenv.config({ path: "./config.env" });

const db = process.env.DATABASE;
const port = process.env.PORT || 6000;

mongoose.connect(db).then(() => console.log("Database connection successful!"));

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
