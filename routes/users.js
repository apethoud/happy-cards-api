const express = require("express");
const router = express.Router();
const Joi = require("joi");
const _ = require("lodash");
const User = require("../models/User");

async function createUser(usr) {
  const user = new User(usr);

  try {
    const result = await user.save();
    return result;
  } catch (err) {
    return err.message;
  }
}

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne(_.pick(req.body, ["email"]));
  if (user) res.status(400).send("User already registered.");

  user = _.pick(req.body, ["name", "email", "password"]);

  createUser(user)
    .then((response) => res.send(_.pick(response, ["_id", "name", "email"])))
    .catch((err) => res.send(err));
});

const validateUser = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).email().required(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(user);
};

module.exports = router;
