let Route = require("../models/route.model");
const jwt = require("jsonwebtoken");
const { secretOrKey } = require("../config/config");
const router = require("express").Router();
const mongoose = require("mongoose");

router.route("/").get((req, res) => {
  let token;
  try {
    token = verifyToken(req);
  } catch (error) {
    res.status(error.status).send({ message: error.message });
  }
  Route.find({ user_id: mongoose.Types.ObjectId(token) })
    .then((exercises) => res.json(exercises))
    .catch((err) => res.status(400).json("Error: " + err));
});

function verifyToken(req) {
  let token = req.headers["x-access-token"];

  if (!token) {
    throw { status: 403, message: "No token provided!" };
  }

  jwt.verify(token, secretOrKey, (err, decoded) => {
    if (err) {
      throw { status: 401, message: "Unauthorized!" };
    } else {
      token = decoded.id;
    }
  });
  return token;
}

module.exports = router;
