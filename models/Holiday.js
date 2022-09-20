const mongoose = require("mongoose");

const Holiday = mongoose.model(
  "Holiday",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  })
);

module.exports = Holiday;
