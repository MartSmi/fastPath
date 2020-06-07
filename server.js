const express = require("express");
const app = express();
const cors = require("cors");
const { port, hostname, uri } = require("./config/config");
const mongoose = require("mongoose");
const passport = require("passport");
const route = require("./api/route");
const routes = require("./api/routes");
const login = require("./api/login");
const register = require("./api/register");

// Connect to MongoDB
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB successfully connected");
});

app.use(cors());
app.use(express.json());

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.post("/api/login", login);
app.post("/api/register", register);
app.use("/api/route", route);
app.use("/api/routes", routes);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
