const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = require(`${__dirname}/app`);
dotenv.config({ path: `${__dirname}/config.env` });

const db = process.env.DATABASE;

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("DB connection established"));

const port = process.env.PORT || 6000;

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
