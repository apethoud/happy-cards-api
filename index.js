const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT;

const app = express();

require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
