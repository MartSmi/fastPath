const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const routeSchema = new Schema({
  email: { type: String, required: true },
  origin: String,
  waypoints: [String],
  destination: String,
  urlShort: { type: String, required: true },
});

const Route = mongoose.model("Route", routeSchema);

module.exports = Route;
