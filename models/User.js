const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    name: {
      type: String,
      minlength: 5,
      maxlength: 50,
      required: true,
    },
    email: {
      type: String,
      minlength: 5,
      maxlength: 255,
      unique: true,
      email: true,
      required: true,
    },
    password: {
      type: String,
      minlength: 5,
      maxlength: 1024,
      required: true,
    },
  })
);

module.exports = User;