import React, { useState, useEffect } from 'react';
import { getJobSuggestions } from '../services/api';
import './JobSuggestions.css';

const JobSuggestions = ({ profileData }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await getJobSuggestions(profileData);
        setJobs(response.jobs);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (profileData) {
      fetchJobs();
    }
  }, [profileData]);

  if (loading) {
    return (
      <div className="jobs-loading">
        <div className="spinner"></div>
        <p>Finding the perfect job matches for you...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="jobs-error">
        <p>Unable to load job suggestions. Please try again later.</p>
      </div>
    );
  }

  if (!jobs || jobs.length === 0) {
    return (
      <div className="jobs-empty">
        <p>No job suggestions available. Please complete your profile to get personalized job recommendations.</p>
      </div>
    );
  }

  return (
    <div className="jobs-container">
      <h2>Recommended Jobs</h2>
      <div className="jobs-grid">
        {jobs.map((job, index) => (
          <div key={index} className="job-card">
            <div className="job-header">
              <h3>{job.title}</h3>
              <span className="company-name">{job.company}</span>
            </div>
            <div className="job-details">
              <div className="job-location">
                <i className="fas fa-map-marker-alt"></i>
                <span>{job.location}</span>
              </div>
              <div className="job-salary">
                <i className="fas fa-money-bill-wave"></i>
                <span>{job.salary}</span>
              </div>
              <div className="job-type">
                <i className="fas fa-briefcase"></i>
                <span>{job.type}</span>
              </div>
            </div>
            <div className="job-match">
              <div className="match-score" style={{ 
                '--score': `${job.matchScore}%` 
              }}>
                <span>{job.matchScore}% Match</span>
              </div>
            </div>
            <div className="job-skills">
              {job.requiredSkills.map((skill, idx) => (
                <span key={idx} className="skill-tag">{skill}</span>
              ))}
            </div>
            <p className="job-description">{job.description}</p>
            <div className="job-actions">
              <button 
                className="apply-btn"
                onClick={() => window.open(job.applyUrl, '_blank')}
              >
                Apply Now
              </button>
              <button className="save-btn">Save Job</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobSuggestions; 