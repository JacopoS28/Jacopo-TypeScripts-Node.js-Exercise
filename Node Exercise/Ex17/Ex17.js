// JWT 1
// app.js (or where you set up your Express app)
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const pgp = require('pg-promise')();
const db = pgPromise()("postgres://postgres:postgres@localhost:3000/");
const usersRouter = require('./routes/users');

const app = express();

// Load environment variables from .env
require('dotenv').config();

// Body parser middleware
app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize());

// Passport JWT configuration
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET
};

passport.use(new JwtStrategy(jwtOptions, async (jwt_payload, done) => {
  try {
    const user = await db.oneOrNone('SELECT * FROM users WHERE id=$1', jwt_payload.id);
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    return done(error, false);
  }
}));

// Mount users router
app.use('/users', usersRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
