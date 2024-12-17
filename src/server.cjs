const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
  host: "localhost",           // Replace with your DB host
  user: "root",                // Replace with your DB username
  password: "$ahan@2004",      // Replace with your DB password
  database: "Employees",       // Replace with your DB name
  port: 3306,                  // Default MySQL port
});

// Test MySQL Connection
db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

// Route to handle form submission
app.post("/submit-form", (req, res) => {
  const { EmployeeName, EmployeeID, EmployeeEmail, EmployeePhone, Department, DateOfJoining, Role } = req.body;

  // SQL Query
  const query = `
    INSERT INTO employees (EmployeeName, EmployeeID, EmployeeEmail, EmployeePhone, Department, DateOfJoining, Role)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.execute(
    query,
    [EmployeeName, EmployeeID, EmployeeEmail, EmployeePhone, Department, DateOfJoining, Role],
    (err, result) => {
      if (err) {
        console.error("Error inserting data:", err.message);
        res.status(500).send("Error saving data");
        return;
      }
      res.status(200).send("Data saved successfully");
    }
  );
});

// Route to delete employee by EmployeeID
app.delete("/delete-employee/:id", (req, res) => {
  const EmployeeID = req.params.id;
  console.log(`Received request to delete employee with ID: ${EmployeeID}`);
  
  const query = "DELETE FROM employees WHERE EmployeeID = ?";
  db.query(query, [EmployeeID], (err, result) => {
    if (err) {
      console.error("Error deleting data:", err);
      res.status(500).send("Error deleting data");
      return;
    }
    if (result.affectedRows > 0) {
      console.log(`Employee with ID ${EmployeeID} deleted.`);
      res.status(200).send("Employee deleted successfully");
    } else {
      console.log(`Employee with ID ${EmployeeID} not found.`);
      res.status(404).send("Employee not found");
    }
  });
});

// Route to view employee by EmployeeID
app.get("/view-employee/:id", (req, res) => {
  const employeeID = req.params.id;

  // SQL query to get employee details
  const query = "SELECT * FROM employees WHERE EmployeeID = ?";
  db.query(query, [employeeID], (err, result) => {
    if (err) {
      console.error("Error fetching data:", err);
      res.status(500).send("Error fetching employee data");
      return;
    }
    if (result.length > 0) {
      res.status(200).json(result[0]);  // Send employee data as JSON response
    } else {
      res.status(404).send("Employee not found");
    }
  });
});



// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
