//setup a simple express app

require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const asyncErrors = require('express-async-errors');

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to log requests
app.use(morgan('dev'));

// Dummy database
let planets = [
  {
    id: 1,
    name: "Earth",
  },
  {
    id: 2,
    name: "Mars",
  },
];

// Routes
app.get('/planets', (req, res) => {
  res.json(planets);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
