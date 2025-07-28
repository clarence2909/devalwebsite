const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const blogController = require('../controllers/blogController');

// Multer config for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Public routes
router.get('/', blogController.getAllPosts);
router.get('/:id', blogController.getPostById);

// Admin routes (to be protected)
router.post('/', upload.single('image'), blogController.createPost);
router.delete('/:id', blogController.deletePost);

module.exports = router; 