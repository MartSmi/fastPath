const dotenv = require("dotenv");
dotenv.config({ path: "./config/.env" });
module.exports = {
  google_api_key: process.env.GOOGLE_API_KEY,
  port: process.env.PORT,
  hostname: process.env.HOSTNAME,
};
