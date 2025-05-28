import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getProfile, updateProfile, logoutUser } from '../services/api';
import './Profile.css';

function ProfilePage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigate('/login');
      return;
    }
    loadProfile(user.id || user._id); // Handle both id formats
  }, [navigate]);

  const loadProfile = async (userId) => {
    try {
      const data = await getProfile(userId);
      if (data) {
        setProfile(data);
      }
    } catch (err) {
      // If profile doesn't exist, we'll create one when user saves
      console.log('No existing profile found');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setProfile(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setProfile(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const userId = user.id || user._id; // Handle both id formats
      
      // Ensure we're sending the userId in the profile data
      const profileData = {
        ...profile,
        userId
      };
      
      await updateProfile(userId, profileData);
      setSuccess('Profile updated successfully!');
    } catch (err) {
      setError('Failed to update profile: ' + (err.message || 'Unknown error'));
      console.error('Profile update error:', err);
    }
  };

  const handleLogout = () => {
    logoutUser();
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <h1>My Profile</h1>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-section">
            <h2>Contact Information</h2>
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                value={profile.phoneNumber || ''}
                onChange={handleChange}
                placeholder="Enter your phone number"
              />
            </div>
          </div>

          <div className="form-section">
            <h2>Address</h2>
            <div className="form-group">
              <label>Street</label>
              <input
                type="text"
                name="address.street"
                value={profile.address?.street || ''}
                onChange={handleChange}
                placeholder="Enter your street address"
              />
            </div>
            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                name="address.city"
                value={profile.address?.city || ''}
                onChange={handleChange}
                placeholder="Enter your city"
              />
            </div>
            <div className="form-group">
              <label>State</label>
              <input
                type="text"
                name="address.state"
                value={profile.address?.state || ''}
                onChange={handleChange}
                placeholder="Enter your state"
              />
            </div>
            <div className="form-group">
              <label>Country</label>
              <input
                type="text"
                name="address.country"
                value={profile.address?.country || ''}
                onChange={handleChange}
                placeholder="Enter your country"
              />
            </div>
            <div className="form-group">
              <label>ZIP Code</label>
              <input
                type="text"
                name="address.zipCode"
                value={profile.address?.zipCode || ''}
                onChange={handleChange}
                placeholder="Enter your ZIP code"
              />
            </div>
          </div>

          <div className="form-section">
            <h2>About Me</h2>
            <div className="form-group">
              <label>Bio</label>
              <textarea
                name="bio"
                value={profile.bio || ''}
                onChange={handleChange}
                rows="4"
                placeholder="Tell us about yourself"
              />
            </div>
          </div>

          <motion.button
            type="submit"
            className="save-btn"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Save Profile
          </motion.button>
        </form>
      </div>
    </div>
  );
}

export default ProfilePage; 