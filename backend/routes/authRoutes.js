const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verifyToken } = require('../middleware/authMiddleware');

router.post('/login', authController.login);
router.get('/protected', verifyToken, (req, res) => {
  res.json({ message: 'You are authenticated as admin.' });
});

module.exports = router; 