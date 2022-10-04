const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

const holidays = require("../routes/holidays");
const users = require("../routes/users");
const auth = require("../routes/auth");
const errorHandler = require("../middleware/error");

module.exports = function (app) {
  app.use(express.json());
  app.use(helmet());
  app.use("/api/holidays", holidays);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use(morgan("tiny"));
  app.use(errorHandler);
};
