//JWT 3

// routes/users.js
const express = require('express');
const usersController = require('../controllers/users');
const { authorize } = require('../middleware/auth');
const router = express.Router();

// Route for user logout
router.get('/logout', authorize, usersController.logout);

module.exports = router;
