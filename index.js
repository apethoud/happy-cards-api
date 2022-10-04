const express = require("express");
require("express-async-errors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const dayjs = require("dayjs");
const winston = require("winston");
require("winston-mongodb");

dotenv.config();
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT;
const JWTSECRET = process.env.JWTSECRET;

winston.add(winston.transports.MongoDB, { db: MONGO_URI, level: "info" });

const app = express();
require("./startup/routes")(app);

process.on("uncaughtException", (ex) => {
  winston.error(ex.message, ex);
  process.exit(1);
});

winston.handleExceptions(
  new winston.transports.File({ filename: "uncaughtExceptions.log" })
);

process.on("unhandledRejection", (ex) => {
  throw ex;
});

if (!JWTSECRET) {
  console.log("FATAL ERROR: JWTSECRET is not defined.");
  process.exit(1);
}

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
