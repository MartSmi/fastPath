let Route = require("../models/route.model");

module.exports = (req, res) => {
  const email = req.body.email;
  const origin = req.body.origin;
  const waypoints = req.body.waypoints;
  const destination = req.body.destination;
  const shortUrl = req.body.shortUrl;

  const newRoute = new Route({
    email,
    origin,
    waypoints,
    destination,
    shortUrl,
  });

  newRoute
    .save()
    .then(() => res.json("Route added"))
    .catch((err) => res.status(400).json("Error: " + err));
};
