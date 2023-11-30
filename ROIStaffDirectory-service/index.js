const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = 3000;

// Middleware function to log requests and responses
app.use((req, res, next) => {
  console.log(`Received ${req.method} request at ${req.url}`);
  console.log('Request body:', req.body);
  res.on('finish', () => {
    console.log(`Responded with status ${res.statusCode}`);
    console.log('Response body:', res.locals.responseBody || '');
  });
  next();
});

let staff = require('./staff.json');
let departments = require('./departments.json');

const writeStaffToFile = () => {
  fs.writeFile('./staff.json', JSON.stringify(staff, null, 2), (err) => {
    if (err) {
      console.error('Error writing to staff file:', err);
    } else {
      console.log('Staff file updated successfully');
    }
  });
};

app.get('/staff', (request, response) => {
  response.locals.responseBody = staff;
  response.json(staff);
});

app.get('/departments', (request, response) => {
  response.locals.responseBody = departments;
  response.json(departments);
});

app.post('/staff', (request, response) => {
  let employee = { ...request.body, Id: staff.length + 1 };
  staff.push(employee);
  writeStaffToFile(); // Write changes to the staff file
  response.status(201).json(employee);
});

app.put('/staff', (request, response) => {
  let i = staff.findIndex((s) => s.Id == request.body.Id);
  if (i < 0) {
    response.status(400).send();
    return;
  }
  staff[i] = request.body;
  writeStaffToFile(); // Write changes to the staff file
  response.status(200).json(request.body);
});

app.delete('/staff/:Id', (request, response) => {
  let i = staff.findIndex((s) => s.Id == request.params.Id);
  if (i < 0) {
    response.status(400).send();
    return;
  }
  staff = staff.filter((s) => s.Id != request.params.Id);
  writeStaffToFile(); // Write changes to the staff file
  response.status(200).send();
});

app.listen(port, () => console.log(`Staff Contact Directory Web Service - Started: Listening on port ${port}`));
