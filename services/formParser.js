const geocode = require("./geocode");

module.exports = async (req_body) => {
  let waypoints = {
    start: null,
    checkpoints: [null],
    finish: null,
  };

  //start
  if (req_body["start"] != null) {
    waypoints["start"] = await geocode.geocode(
      req_body["start"]["description"]
    );
  } else {
  }
  //checkpoints
  await req_body["checkpoints"].map(async (address, index) => {
    waypoints["checkpoints"][index] = await geocode.geocode(
      address["description"]
    );
  });

  //finish
  if (req_body["finish"] != null) {
    waypoints["finish"] = await geocode.geocode(
      req_body["finish"]["description"]
    );
  } else {
  }
  return waypoints;
};
