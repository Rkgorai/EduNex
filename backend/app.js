const express = require("express");
const mysql = require("mysql2");
const { Client } = require("pg");

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000; // You can change the port if needed

// Database Configurations
const dbConfigMySQL1 = {
  host: "192.168.41.247",
  user: "root",
  password: "Khan7896",
  database: "nptel",
};

const dbConfigMySQL2 = {
  host: "192.168.42.218",
  user: "root",
  password: "rahul",
  database: "skill_course_database",
};

const dbConfigPostgres = {
  host: "192.168.41.220",
  user: "postgres",
  password: "8077",
  database: "hospital1",
};

// Create connections
const connectionMySQL1 = mysql.createConnection(dbConfigMySQL1);
const connectionMySQL2 = mysql.createConnection(dbConfigMySQL2);
const clientPostgres = new Client(dbConfigPostgres);

// Function to check connections and display tables
async function checkConnections() {
  // MySQL Database 1
  connectionMySQL1.connect((err) => {
    if (err) {
      console.error("MySQL Database 1 Connection Error:", err);
    } else {
      console.log("Connected to MySQL Database 1");
      connectionMySQL1.query("SHOW TABLES", (err, tables) => {
        if (err) throw err;
        console.log("Tables in MySQL Database 1:", tables);
      });
    }
  });

  // MySQL Database 2
  connectionMySQL2.connect((err) => {
    if (err) {
      console.error("MySQL Database 2 Connection Error:", err);
    } else {
      console.log("Connected to MySQL Database 2");
      connectionMySQL2.query("Select * from courses ", (err, tables) => {
        if (err) throw err;
        console.log("Tables in MySQL Database 2:", tables);
      });
    }
  });

  // PostgreSQL Database
  try {
    await clientPostgres.connect();
    console.log("Connected to PostgreSQL Database");
    const res = await clientPostgres.query(
      "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'"
    );
    console.log("Tables in PostgreSQL Database:", res.rows);
  } catch (error) {
    console.error("PostgreSQL Database Connection Error:", error);
  } finally {
    await clientPostgres.end();
  }
}

// Call the checkConnections function
checkConnections();

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
