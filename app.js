const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const { port, hostname } = require("./config/config");
const fastPath = require("./services/fastPath");
const form = require("./api/form");
//fastPath.getDistances()

app.use(bodyParser.json());
app.use(cors());
app.post("/api/users/register", form.post);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
