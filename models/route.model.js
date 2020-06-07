const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const routeSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId },
    origin: String,
    waypoints: [String],
    destination: String,
    urlShort: { type: String, required: true },
  },
  { timestamps: { createdAt: "created_at" } }
);

const Route = mongoose.model("Route", routeSchema);

module.exports = Route;
