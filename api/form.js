const fastPath = require("../services/fastPath");

exports.post = function (req, res) {
  fastPath.start(req.body);
};
