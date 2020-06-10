const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const routeSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId },
  origin: String,
  waypoints: [String],
  destination: String,
  urlShort: { type: String, required: true },
  created: {
    type: Date,
    default: Date.now,
  },
});

const Route = mongoose.model("Route", routeSchema);

module.exports = Route;
