import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SkillDevelopment.css';

function SkillDevelopment() {
  const [searchQuery, setSearchQuery] = useState('');
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Mock API call - in a real app, you'd fetch data from a backend
    await new Promise(resolve => setTimeout(resolve, 1000));
    setVideos([
      { id: 1, title: `${searchQuery} - Beginner Course`, url: 'https://www.youtube.com/results?search_query=basic+course+for+programming' },
      { id: 2, title: `Advanced ${searchQuery} Techniques`, url: 'https://www.youtube.com/results?search_query=advance+technical+analysis+co' },
      { id: 3, title: `${searchQuery} for Professionals`, url: 'https://www.youtube.com/results?search_query=skill+development+for+professonals' },
    ]);
    setLoading(false);
  };

  return (
    <div className="skill-development-page">
      <header className="page-header">
        <h1>Skill Development</h1>
        <Link to="/dashboard" className="back-link">Back to Dashboard</Link>
      </header>
      <main className="page-content">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for skills..."
            required
          />
          <button type="submit" className="search-btn" disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>

        {videos.length > 0 && (
          <div className="results">
            <h2>Educational Videos</h2>
            <div className="video-grid">
              {videos.map((video) => (
                <div key={video.id} className="video-card">
                  <h3>{video.title}</h3>
                  <a href={video.url} target="_blank" rel="noopener noreferrer" className="watch-btn">
                    Watch Video
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default SkillDevelopment;

