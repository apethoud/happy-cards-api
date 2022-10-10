const MONGO_URI = process.env.MONGO_URI;
const mongoose = require("mongoose");
// const winston = require("winston");

module.exports = function () {
  mongoose.connect(MONGO_URI).then(() => console.log("Connected to MongoDB!"));
};
