let Route = require("../models/route.model");
const jwt = require("jsonwebtoken");
const { secretOrKey } = require("../config/config");
const router = require("express").Router();
const fastPath = require("../services/fastPath");

router.route("/create").post((req, res) => {
  fastPath(req.body)
    .then((response) => {
      console.log(response);
      res.send(JSON.stringify(response));
    })
    .catch((err) => {
      res.status(400).send({
        message: err,
      });
    });
});

router.route("/save").post((req, res) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, secretOrKey, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    const user_id = decoded.id;
    const origin = req.body.origin;
    const waypoints = req.body.waypoints;
    const destination = req.body.destination;
    const urlShort = req.body.urlShort;

    const newRoute = new Route({
      user_id,
      origin,
      waypoints,
      destination,
      urlShort,
    });

    newRoute
      .save()
      .then(() => res.json("Route added"))
      .catch((err) => res.status(400).json("Error: " + err));
  });
});

router.route("/delete").post((req, res) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, secretOrKey, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    Route.deleteOne({ _id: req.body.id })
      .then(() => res.json("Route deleted"))
      .catch((err) => res.status(400).json("Error: " + err));
  });
});

module.exports = router;
