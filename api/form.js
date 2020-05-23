const fastPath = require("../services/fastPath");

exports.post = (req, res) => {
  fastPath(req.body)
    .then((url) => console.log("url: " + url))
    .catch((err) => {
      console.log("here is an error");
    });
};
