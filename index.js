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

const app = express();
app.use(express.json());
const PORT = 3000;
const studentData = require('./data.json');

app.post('/students/above-threshold', (req, res) => {
  console.log('Received request:', req.body);
  const { threshold } = req.body;
  // console.log('Received threshold:', threshold);

  if (threshold === undefined || typeof threshold !== 'number') {
    console.error('Invalid threshold:', threshold);
    return res.status(400).json({ error: 'threshold must be a number' });
  }

  const filteredStudents = studentData
    .filter((student) => student.total > threshold)
    // .map((student) => ({ name: student.name, total: student.total }));

  // console.log('Filtered students:', filteredStudents);

  res.send({
    count: filteredStudents.length,
    students: filteredStudents,
  });

});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});