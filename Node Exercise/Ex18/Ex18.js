// JWT 2
// routes/users.js
const express = require('express');
const usersController = require('../controllers/users');
const router = express.Router();

// Route for user signup
router.post('/signup', usersController.signup);

// Route for user login
router.post('/login', usersController.login);

module.exports = router;
