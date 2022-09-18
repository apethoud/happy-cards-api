const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const dayjs = require("dayjs");
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT;
const holidays = require("./routes/holidays");
const users = require("./routes/users");
const app = express();

app.use(express.json());
app.use(helmet());
app.use("/api/holidays", holidays);
app.use("/api/users", users);
app.use(morgan("tiny"));

function connect() {
  mongoose
    .connect(MONGO_URI)
    .then(() => console.log("Connected to MongoDB!"))
    .catch((err) => {
      console.log("Could not connect to MongoDB.");
      console.log(err);
    });
}

connect();

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
