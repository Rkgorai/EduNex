const express = require("express");
const mysql = require("mysql2");

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

const dbConfigMySQL3 = {
  host: "192.168.42.192",
  user: "root",
  password: "admin",
  database: "tutorDB",
};

// Create connections
const connectionMySQL1 = mysql.createConnection(dbConfigMySQL1);
const connectionMySQL2 = mysql.createConnection(dbConfigMySQL2);
const connectionMySQL3 = mysql.createConnection(dbConfigMySQL3);

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
  connectionMySQL3.connect((err) => {
    if (err) {
      console.error("MySQL Database 3 Connection Error:", err);
    } else {
      console.log("Connected to MySQL Database 3");
      connectionMySQL3.query("SHOW TABLES ", (err, tables) => {
        if (err) throw err;
        console.log("Tables in MySQL Database 3:", tables);
      });
    }
  });
}

// Call the checkConnections function
checkConnections();

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
