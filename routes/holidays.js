const express = require("express");
// const Joi = require("joi");
// const _ = require("lodash");
const router = express.Router();
// const auth = require("../middleware/auth");
const Holiday = require("../models/Holiday");

async function getHolidays() {
  const holidays = await Holiday.find({});
  return holidays;
}

// async function createHoliday(hol) {
//   const holiday = new Holiday(hol);

//   try {
//     const result = await holiday.save();
//     return result;
//   } catch (err) {
//     return err.message;
//   }
// }

router.get("/", (req, res) => {
  getHolidays()
    .then((response) => res.send(response))
    .catch((err) => res.send(err));
});

// router.post("/", auth, async (req, res, next) => {
//   const { error } = validateHoliday(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//   let user = await Holiday.findOne(_.pick(req.body, ["name"]));
//   if (user) return res.status(400).send("Holiday already exists.");

//   createHoliday(_.pick(req.body, ["name", "date"]))
//     .then((response) => res.send(response))
//     .catch((err) => res.send(err));
// });

// const validateHoliday = (holiday) => {
//   const schema = Joi.object({
//     name: Joi.string().min(3).required(),
//     date: Joi.date().required(),
//   });

//   return schema.validate(holiday);
// };

module.exports = router;
