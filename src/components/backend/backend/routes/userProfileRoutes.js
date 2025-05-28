const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Sample UserProfile Schema for Testing
const userProfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: String,
  contactDetails: { type: String, required: true, unique: true },
  skills: String,
  flexibleHours: Boolean,
  remoteWork: Boolean,
  workType: String,
  careerGrowth: String,
  industryPreferences: String,
  previousExperience: String,
  availability: String,
});

const UserProfile = mongoose.model('UserProfile', userProfileSchema);

// Route to create or update user profile
router.post('/', async (req, res) => {
  try {
    const { name, location, contactDetails, skills, flexibleHours, remoteWork, workType, careerGrowth, industryPreferences, previousExperience, availability } = req.body;

    // Create or update profile
    let userProfile = await UserProfile.findOne({ contactDetails });
    if (userProfile) {
      // Update existing profile
      Object.assign(userProfile, { name, location, skills, flexibleHours, remoteWork, workType, careerGrowth, industryPreferences, previousExperience, availability });
      await userProfile.save();
    } else {
      // Create a new profile
      userProfile = new UserProfile({ name, location, contactDetails, skills, flexibleHours, remoteWork, workType, careerGrowth, industryPreferences, previousExperience, availability });
      await userProfile.save();
    }
    res.status(201).json({ message: 'Profile updated successfully', userProfile });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Server error, please try again later' });
  }
});

// Route to get a user profile
router.get('/:contactDetails', async (req, res) => {
  try {
    const userProfile = await UserProfile.findOne({ contactDetails: req.params.contactDetails });
    if (!userProfile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    res.status(200).json(userProfile);
  } catch (error) {
    console.error('Error retrieving profile:', error);
    res.status(500).json({ error: 'Server error, please try again later' });
  }
});

// Route to delete a user profile (for testing purposes)
router.delete('/:contactDetails', async (req, res) => {
  try {
    const userProfile = await UserProfile.findOneAndDelete({ contactDetails: req.params.contactDetails });
    if (!userProfile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    res.status(200).json({ message: 'Profile deleted successfully' });
  } catch (error) {
    console.error('Error deleting profile:', error);
    res.status(500).json({ error: 'Server error, please try again later' });
  }
});

module.exports = router;
