// API: Retrieve Students Above Threshold
// ---------------------------------------
// Task:
// Implement an API to fetch students whose total marks exceed a given threshold.
//
// Endpoint:
// POST /students/above-threshold
//
// Request Body:
// {
//   "threshold": <number>
// }
//
// Response:
// Success: List of students with their names and total marks who meet the criteria.
// Example:
// {
//   "count": 2,
//   "students": [
//     { "name": "Alice Johnson", "total": 433 },
//     { "name": "Bob Smith", "total": 410 }
//   ]
// }
//
// No Matches:
// {
//   "count": 0,
//   "students": []
// }
//
// Purpose:
// Help teachers retrieve and analyze student performance efficiently.

const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 9090;

// Middleware to parse JSON in request bodies
app.use(express.json());
app.use(express.static('static'));
const students = require('./data.json');
// Mock student data

// Serve homepage
app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

// API Endpoint: Retrieve students above threshold
app.post('/students/above-threshold', (req, res) => {
  const { threshold } = req.body;

  // Validate threshold
  if (typeof threshold !== 'number' || threshold < 0) {
    return res
      .status(400)
      .json({
        error: 'Invalid threshold value. It must be a non-negative number.',
      });
  }

  // Filter students based on the threshold
  const filteredStudents = students.filter(
    (student) => student.total > threshold
  );

  res.status(200).json({
    count: filteredStudents.length,
    students: filteredStudents,
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});