const express = require('express');
const { getUserProfile } = require('../components/userController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/profile', protect, getUserProfile);

module.exports = router;
