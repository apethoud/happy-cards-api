const express = require("express");
const Joi = require("joi");
const router = express.Router();
const Holiday = require("../models/Holiday");

async function getHolidays() {
  const holidays = await Holiday.find({});
  console.log(holidays);
  return holidays;
}

async function createHoliday(hol) {
  const holiday = new Holiday(hol);

  try {
    const result = await holiday.save();
    return result;
  } catch (err) {
    return err.message;
  }
}

router.get("/", (req, res) => {
  getHolidays()
    .then((response) => res.send(response))
    .catch((err) => res.send(err));
});

router.post("/", (req, res) => {
  const { error } = validateHoliday(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  createHoliday(req.body)
    .then((response) => res.send(response))
    .catch((err) => res.send(err));
});

const validateHoliday = (holiday) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    date: Joi.date().required(),
  });

  return schema.validate(holiday);
};

module.exports = router;
