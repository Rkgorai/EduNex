const { Sequelize } = require("sequelize");
require("dotenv").config();

// Database 1
const db1 = new Sequelize(
  process.env.DB1_NAME,
  process.env.DB1_USER,
  process.env.DB1_PASS,
  {
    host: process.env.DB1_HOST,
    dialect: "mysql",
    logging: false, // Disable SQL query logging
  }
);

// Database 2
const db2 = new Sequelize(
  process.env.DB2_NAME,
  process.env.DB2_USER,
  process.env.DB2_PASS,
  {
    host: process.env.DB2_HOST,
    dialect: "mysql",
    logging: false,
  }
);

// Database 3
const db3 = new Sequelize(
  process.env.DB3_NAME,
  process.env.DB3_USER,
  process.env.DB3_PASS,
  {
    host: process.env.DB3_HOST,
    dialect: "mysql",
    logging: false,
  }
);
module.exports = { db1, db2, db3 };
