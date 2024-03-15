// routes/planets.js
const express = require('express');
const planetsController = require('../controllers/planets');
const { authorize } = require('../middleware/auth');
const router = express.Router();
const multer = require('multer');

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

// Route for file upload (planet's image) and updating planet in the database
router.post('/:id/image', authorize, upload.single('image'), planetsController.uploadImage);

module.exports = router;
