const fastPath = require("../services/fastPath");

exports.post = (req, res) => {
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
};
