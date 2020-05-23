const NodeGeocoder = require("node-geocoder");
const { google_api_key } = require("../config/config");
const options = {
  provider: "google",
  apiKey: google_api_key,
  formatter: null,
};

const geocoder = NodeGeocoder(options);

module.exports = async (address) => {
  console.log(address);

  return await geocoder.geocode(address);
};
