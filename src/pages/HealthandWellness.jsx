import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './HealthandWellness.css';

function HealthAndWellness() {
  const [formData, setFormData] = useState({
    age: '',
    weight: '',
    height: '',
    lifestyle: [],
    foodIntake: [],
    dailyActivities: '',
    healthGoals: '',
  });

  const [recommendations, setRecommendations] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData(prevState => ({
        ...prevState,
        [name]: checked
          ? [...prevState[name], value]
          : prevState[name].filter(item => item !== value)
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to a backend API
    // For now, we'll just set some mock recommendations
    setRecommendations({
      diet: `Based on your ${formData.lifestyle.join(', ')} lifestyle and ${formData.foodIntake.join(', ')} diet, we recommend increasing your intake of vegetables and lean proteins.`,
      exercise: `For your age group (${formData.age}) and lifestyle, we suggest 30 minutes of moderate exercise 5 days a week.`,
      meditation: 'Try starting with 10 minutes of mindfulness meditation each morning.',
      videos: [
        { id: 1, title: 'Beginner Yoga Routine', url: 'https://www.youtube.com/results?search_query=yoga+routine+for+beginners' },
        { id: 2, title: 'Healthy Meal Prep Ideas', url: 'https://www.youtube.com/results?search_query=healthy+meal+prep+ideas' },
        { id: 3, title: 'Guided Meditation for Stress Relief', url: 'https://www.youtube.com/results?search_query=guided+meditation+for+stress+relief' },
      ],
    });
  };

  return (
    <div className="health-wellness-page">
      <header className="page-header">
        <h1>Health & Wellness</h1>
        <Link to="/dashboard" className="back-link">Back to Dashboard</Link>
      </header>
      <main className="page-content">
        <form onSubmit={handleSubmit} className="health-form">
          <div className="form-section">
            <h3>Personal Information</h3>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              placeholder="Age"
              required
            />
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleInputChange}
              placeholder="Weight (kg)"
              required
            />
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleInputChange}
              placeholder="Height (cm)"
              required
            />
          </div>

          <div className="form-section">
            <h3>Lifestyle</h3>
            <div className="checkbox-group">
              {['sedentary', 'moderately active', 'active'].map((option) => (
                <label key={option}>
                  <input
                    type="checkbox"
                    name="lifestyle"
                    value={option}
                    checked={formData.lifestyle.includes(option)}
                    onChange={handleInputChange}
                  />
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </label>
              ))}
            </div>
          </div>

          <div className="form-section">
            <h3>Food Intake</h3>
            <div className="checkbox-group">
              {['vegetarian', 'non-vegetarian', 'vegan'].map((option) => (
                <label key={option}>
                  <input
                    type="checkbox"
                    name="foodIntake"
                    value={option}
                    checked={formData.foodIntake.includes(option)}
                    onChange={handleInputChange}
                  />
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </label>
              ))}
            </div>
          </div>

          <div className="form-section">
            <h3>Daily Activities</h3>
            <textarea
              name="dailyActivities"
              value={formData.dailyActivities}
              onChange={handleInputChange}
              placeholder="Describe your daily activities..."
              required
            ></textarea>
          </div>

          <div className="form-section">
            <h3>Health Goals</h3>
            <textarea
              name="healthGoals"
              value={formData.healthGoals}
              onChange={handleInputChange}
              placeholder="What are your health and wellness goals?"
              required
            ></textarea>
          </div>

          <button type="submit" className="submit-btn">Get Recommendations</button>
        </form>

        {recommendations && (
          <div className="recommendations">
            <h2>Your Personalized Recommendations</h2>
            <p><strong>Diet:</strong> {recommendations.diet}</p>
            <p><strong>Exercise:</strong> {recommendations.exercise}</p>
            <p><strong>Meditation:</strong> {recommendations.meditation}</p>
            <h3>Recommended Videos</h3>
            <div className="video-grid">
              {recommendations.videos.map((video) => (
                <div key={video.id} className="video-card">
                  <h4>{video.title}</h4>
                  <a href={video.url} target="_blank" rel="noopener noreferrer" className="watch-btn">Watch Video</a>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default HealthAndWellness;
