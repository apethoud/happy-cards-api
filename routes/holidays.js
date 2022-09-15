const express = require("express");
const router = express.Router();
const Holiday = require("../models/Holiday");

async function getHolidays() {
  const holidays = await Holiday.find({});
  console.log(holidays);
  return holidays;
}

async function createHoliday(tempHoliday) {
  const holiday = new Holiday(tempHoliday);

  try {
    const result = await holiday.save();
    console.log("*** Result: ", result);
    return result;
  } catch (err) {
    console.log(err.message);
    return err.message;
  }
}

router.get("/", (req, res) => {
  getHolidays()
    .then((response) => res.send(response))
    .catch((err) => res.send(err));
});

router.post("/", (req, res) => {
  createHoliday(req.body)
    .then((response) => res.send(response))
    .catch((err) => res.send(err));
});

module.exports = router;
