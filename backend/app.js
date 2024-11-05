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

// Unified query function
async function federateQuery(queryType, searchTerm) {
  const results = [];

  // MySQL Database 1
  connectionMySQL1.query(
    `SELECT course_name, instructor, rating FROM courses WHERE ${queryType} LIKE ?`,
    [`%${searchTerm}%`],
    (err, res) => {
      if (err) throw err;
      results.push(...res);
    }
  );

  // MySQL Database 2
  connectionMySQL2.query(
    `SELECT course_name, tutor_name AS instructor, rating FROM courses WHERE ${queryType} LIKE ?`,
    [`%${searchTerm}%`],
    (err, res) => {
      if (err) throw err;
      results.push(...res);
    }
  );

  // PostgreSQL Database
  await clientPostgres.connect();
  const pgQuery = `SELECT course_name, instructor, enrolled_role_student AS enrollments FROM courses WHERE ${queryType} LIKE $1`;
  const pgRes = await clientPostgres.query(pgQuery, [`%${searchTerm}%`]);
  results.push(...pgRes.rows);
  await clientPostgres.end();

  return results;
}

// Define the search route
app.get("/search", async (req, res) => {
  const { queryType, searchTerm } = req.query;
  try {
    const data = await federateQuery(queryType, searchTerm);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Add connection logic if needed, similar to previous examples
