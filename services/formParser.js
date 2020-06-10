//const geocode = require("./geocode");

module.exports = async (req_body) => {
  let waypoints = [];
  let origin = true;
  let destination = true;

  //waypoints
  await req_body["waypoints"].map(async (address, index) => {
    if (typeof address["description"] == "undefined") {
      waypoints.push(address);
    } else {
      waypoints.push(address["description"]);
    }
  });

  //origin
  if (req_body["origin"] != "") {
    if (typeof req_body["origin"]["description"] == "undefined") {
      waypoints.push(req_body["origin"]);
    } else {
      waypoints.push(req_body["origin"]["description"]);
    }
  } else {
    origin = false;
  }

  //destination
  if (req_body["destination"] != "") {
    if (typeof req_body["destination"]["description"] == "undefined") {
      waypoints.push(req_body["destination"]);
    } else {
      waypoints.push(req_body["destination"]["description"]);
    }
  } else {
    destination = false;
  }
  return { waypoints, origin, destination };
};
