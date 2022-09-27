const express = require("express");
const router = express.Router();
const Joi = require("joi");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const User = require("../models/User");

router.post("/", async (req, res, next) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    let user = await User.findOne(_.pick(req.body, ["email"]));
    if (!user) res.status(400).send("Invalid email or password.");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) res.status(400).send("Invalid email or password.");

    const token = user.generateAuthToken();
    res.send(token);
  } catch (err) {
    next(err);
  }
});

const validate = (req) => {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).email().required(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(req);
};

module.exports = router;
