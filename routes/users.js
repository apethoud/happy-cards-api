const express = require("express");
const router = express.Router();
const Joi = require("joi");
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

router.post("/", (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  createUser(req.body)
    .then((response) => res.send(response))
    .catch((err) => res.send(err));
});

const validateUser = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().required(),
    password: Joi.string().min(3).required(),
  });

  return schema.validate(user);
};

module.exports = router;
