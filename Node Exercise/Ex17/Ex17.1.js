// routes/users.js
const express = require('express');
const passport = require('passport');
const usersController = require('../controllers/users');
const router = express.Router();

// Route for user login
router.post('/login', usersController.login);

// Route for user profile (protected route)
router.get('/profile', passport.authenticate('jwt', { session: false }), usersController.profile);

module.exports = router;
