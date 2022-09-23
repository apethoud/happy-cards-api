const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const JWTSECRET = process.env.JWTSECRET;

const userSchema = new mongoose.Schema({
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
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, JWTSECRET);
  return token;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
