const express = require('express');
const router = express.Router();
const UserProfile = require('../models/UserProfile');

// Get user profile
router.get('/:userId', async (req, res) => {
  try {
    const profile = await UserProfile.findOne({ userId: req.params.userId });
    if (!profile) {
      // Return empty profile with userId if not found
      return res.json({
        userId: req.params.userId,
        phoneNumber: '',
        address: {
          street: '',
          city: '',
          state: '',
          country: '',
          zipCode: ''
        },
        bio: '',
        skills: [],
        experience: [],
        education: []
      });
    }
    res.json(profile);
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Create or update user profile
router.post('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const profileData = {
      ...req.body,
      userId // Ensure userId is set
    };

    const profile = await UserProfile.findOneAndUpdate(
      { userId },
      { $set: profileData },
      { new: true, upsert: true, runValidators: true }
    );

    res.json(profile);
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 