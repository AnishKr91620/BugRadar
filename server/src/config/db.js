const mysql = require("mysql2/promise");
const fs = require("fs");
require("dotenv").config();

const path = require("path");

const caCertPath = path.resolve(__dirname, "../../certs/ca.pem");

const poll = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: fs.existsSync(caCertPath)
    ? {
        ca: fs.readFileSync(caCertPath, "utf8"),
      }
    : undefined,
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = poll;
