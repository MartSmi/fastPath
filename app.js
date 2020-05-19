const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const { port, hostname } = require("./config/config");
const fastPath = require("./services/fastPath");
//fastPath.getDistances()

app.use(bodyParser.json());
app.use(cors());

app.post("/api/users/register", (req, res) => {
  console.log(req.body);
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
