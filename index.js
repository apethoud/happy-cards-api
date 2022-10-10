const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/prod")(app);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
