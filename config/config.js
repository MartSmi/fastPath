const dotenv = require("dotenv");
dotenv.config({ path: "./config/.env" });
module.exports = {
  matrixKey: process.env.GOOGLE_MATRIX_API_KEY,
  port: process.env.PORT,
  hostname: process.env.HOSTNAME,
};
