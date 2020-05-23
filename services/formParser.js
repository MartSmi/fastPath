const geocode = require("./geocode");

module.exports = async (req_body) => {
  let waypoints = [];
  let start = true;
  let finish = true;
  //checkpoints
  await req_body["checkpoints"].map(async (address, index) => {
    if (typeof address["description"] == "undefined") {
      waypoints.push(await geocode(address));
    } else {
      waypoints.push(await geocode(address["description"]));
    }
  });

  //start
  if (req_body["start"] != null) {
    if (typeof req_body["start"]["description"] == "undefined") {
      waypoints.push(await geocode(req_body["start"]));
    } else {
      waypoints.push(await geocode(req_body["start"]["description"]));
    }
  } else {
    start = false;
  }

  //finish
  if (req_body["finish"] != null) {
    if (typeof req_body["finish"]["description"] == "undefined") {
      waypoints.push(await geocode(req_body["finish"]));
    } else {
      waypoints.push(await geocode(req_body["finish"]["description"]));
    }
  } else {
    finish = false;
  }
  return { waypoints, start, finish };
};
