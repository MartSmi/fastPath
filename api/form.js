const fastPath = require("../services/fastPath");

exports.post = (req, res) => {
  fastPath(req.body)
    .then((url) => res.send(JSON.stringify(url)))
    .catch((err) => {
      console.log(err);
    });
};
