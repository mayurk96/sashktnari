const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
  name: String,
  location: String,
  contactDetails: String,
  skills: String,
  flexibleHours: Boolean,
  remoteWork: Boolean,
  workType: String,
  careerGrowth: String,
  industryPreferences: String,
  previousExperience: String,
  availability: String,
}, { timestamps: true });

module.exports = mongoose.model('UserProfile', userProfileSchema);
