const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const { port, hostname } = require("./config/config");
const fastPath = require("./services/fastPath");
const form = require("./api/form");

app.use(cors());
app.use(express.json());

app.post("/api/route", form.post);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
