const fastPath = require("../services/fastPath");

exports.post = async (req, res) => {
  let url = await fastPath.start(req.body);
  // console.log("url:" + url);
  // res.end(url);
};
