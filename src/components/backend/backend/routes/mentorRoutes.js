const express = require('express');
const router = express.Router();

// Define routes for mentor-related operations
router.get('/', (req, res) => {
    res.send('Mentor routes are working!');
});

module.exports = router;
