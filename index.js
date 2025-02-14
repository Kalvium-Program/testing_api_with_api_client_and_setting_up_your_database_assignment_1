const express = require('express');
const { resolve } = require('path');
const students = require('./data');
const app = express();
const port = 3010;

app.use(express.static('static'));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});


app.post('/students/above-threshold', (req, res) => {
  const { threshold } = req.body;

  // Validate request
  if (typeof threshold !== 'number' || threshold < 0) {
      return res.status(400).json({ error: "Invalid threshold value" });
  }

  // Filter students whose total marks exceed the threshold
  const filteredStudents = students.filter(student => student.total > threshold);

  res.json({
      count: filteredStudents.length,
      students: filteredStudents
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});