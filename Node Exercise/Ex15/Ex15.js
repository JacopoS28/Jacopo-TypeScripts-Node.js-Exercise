// Add postgres DB
const express = require('express');
const bodyParser = require('body-parser');
const pgp = require('pg-promise')();
const db = pgPromise()("postgres://postgres:postgres@localhost:3000/");
const planetsRouter = require('./routes/planets');

const app = express();

app.use(bodyParser.json());

// Mount planets router
app.use('/planets', planetsRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
