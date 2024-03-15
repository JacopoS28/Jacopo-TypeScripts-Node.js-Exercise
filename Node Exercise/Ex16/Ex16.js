// app.js (or where you set up your Express app)
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const pgp = require('pg-promise')();
const db = pgPromise()("postgres://postgres:postgres@localhost:3000/");
const planetsRouter = require('./routes/planets');

const app = express();

app.use(bodyParser.json());

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  }
});
const upload = multer({ storage });

// Mount planets router
app.use('/planets', planetsRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
