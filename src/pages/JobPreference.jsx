import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthProvider';
import axios from 'axios';
import './JobPreference.css';

const JobPreference = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    education: {
      degree: '',
      field: '',
      institution: '',
      graduationYear: ''
    },
    experience: {
      yearsOfExperience: '',
      currentRole: '',
      currentCompany: '',
      previousRoles: ''
    },
    skills: '',
    interests: {
      industries: '',
      roles: ''
    },
    workPreferences: {
      workType: 'Full Time',
      preferredLocation: '',
      remoteWork: false,
      expectedSalary: ''
    }
  });

  const [jobs, setJobs] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('jobs');

  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      try {
        setFormData(JSON.parse(savedProfile));
      } catch (err) {
        console.error('Error loading saved profile:', err);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [section, field] = name.split('.');
      setFormData(prev => {
        const newData = {
          ...prev,
          [section]: {
            ...prev[section],
            [field]: type === 'checkbox' ? checked : value
          }
        };
        localStorage.setItem('userProfile', JSON.stringify(newData));
        return newData;
      });
    } else {
      setFormData(prev => {
        const newData = {
          ...prev,
          [name]: value
        };
        localStorage.setItem('userProfile', JSON.stringify(newData));
        return newData;
      });
    }
  };

  const getRecommendations = async () => {
    if (!formData.skills) {
      setError('Please enter at least one skill to get recommendations.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Format the data according to backend expectations
      const formattedProfile = {
        skills: formData.skills,
        preferredIndustries: formData.interests.industries,
        desiredRoles: formData.interests.roles,
        workType: formData.workPreferences.workType,
        preferredLocation: formData.workPreferences.preferredLocation,
        remoteWork: formData.workPreferences.remoteWork,
        yearsOfExperience: formData.experience.yearsOfExperience,
        currentRole: formData.experience.currentRole,
        currentCompany: formData.experience.currentCompany,
        previousRoles: formData.experience.previousRoles
      };

      // Log the formatted data
      console.log('Sending formatted profile data:', formattedProfile);

     const [jobsResponse, companiesResponse] = await Promise.all([
        axios.post('http://localhost:5002/api/recommendations', formattedProfile),
        axios.post('http://localhost:5002/api/recommendations', formattedProfile)
      ]);

      // Log the responses
      console.log('Jobs response:', jobsResponse.data);
      console.log('Companies response:', companiesResponse.data);

      if (jobsResponse.data.status === 'success') {
        setJobs(jobsResponse.data.recommendations || []);
      } else {
        console.error('Jobs API returned error:', jobsResponse.data);
        setError(jobsResponse.data.message || 'Error getting job recommendations');
      }

      if (companiesResponse.data.status === 'success') {
        setCompanies(companiesResponse.data.recommendations || []);
      } else {
        console.error('Companies API returned error:', companiesResponse.data);
        setError(companiesResponse.data.message || 'Error getting company recommendations');
      }

      // Scroll to recommendations
      document.querySelector('.recommendations-section')?.scrollIntoView({
        behavior: 'smooth'
      });
    } catch (err) {
      console.error('API Error:', err);
      console.error('Error details:', err.response?.data);
      setError(
        err.response?.data?.message || 
        err.message || 
        'Error getting recommendations. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-form-container">
      <h2 className="profile-form-title">Complete Your Professional Profile</h2>
      
      <div className="profile-form">
        {/* Education Section */}
        <div className="form-section">
          <h3>Education</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Degree</label>
              <input
                type="text"
                name="education.degree"
                value={formData.education.degree}
                onChange={handleChange}
                placeholder="e.g., Bachelor's in Computer Science"
              />
            </div>
            <div className="form-group">
              <label>Field of Study</label>
              <input
                type="text"
                name="education.field"
                value={formData.education.field}
                onChange={handleChange}
                placeholder="e.g., Computer Science"
              />
            </div>
            <div className="form-group">
              <label>Institution</label>
              <input
                type="text"
                name="education.institution"
                value={formData.education.institution}
                onChange={handleChange}
                placeholder="e.g., University Name"
              />
            </div>
            <div className="form-group">
              <label>Graduation Year</label>
              <input
                type="number"
                name="education.graduationYear"
                value={formData.education.graduationYear}
                onChange={handleChange}
                placeholder="e.g., 2023"
              />
            </div>
          </div>
        </div>

        {/* Experience Section */}
        <div className="form-section">
          <h3>Experience</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Years of Experience</label>
              <input
                type="number"
                name="experience.yearsOfExperience"
                value={formData.experience.yearsOfExperience}
                onChange={handleChange}
                placeholder="e.g., 2"
              />
            </div>
            <div className="form-group">
              <label>Current Role</label>
              <input
                type="text"
                name="experience.currentRole"
                value={formData.experience.currentRole}
                onChange={handleChange}
                placeholder="e.g., Software Developer"
              />
            </div>
            <div className="form-group">
              <label>Current Company</label>
              <input
                type="text"
                name="experience.currentCompany"
                value={formData.experience.currentCompany}
                onChange={handleChange}
                placeholder="e.g., Tech Company Ltd"
              />
            </div>
            <div className="form-group">
              <label>Previous Roles</label>
              <textarea
                name="experience.previousRoles"
                value={formData.experience.previousRoles}
                onChange={handleChange}
                placeholder="Brief description of previous roles"
              />
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="form-section">
          <h3>Skills</h3>
          <div className="form-group">
            <label>Technical Skills (comma-separated)</label>
            <textarea
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="e.g., JavaScript, React, Node.js, Python"
              required
            />
          </div>
        </div>

        {/* Interests Section */}
        <div className="form-section">
          <h3>Career Interests</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Preferred Industries (comma-separated)</label>
              <input
                type="text"
                name="interests.industries"
                value={formData.interests.industries}
                onChange={handleChange}
                placeholder="e.g., Technology, Healthcare, Finance"
              />
            </div>
            <div className="form-group">
              <label>Desired Roles (comma-separated)</label>
              <input
                type="text"
                name="interests.roles"
                value={formData.interests.roles}
                onChange={handleChange}
                placeholder="e.g., Software Engineer, Product Manager"
              />
            </div>
          </div>
        </div>

        {/* Work Preferences Section */}
        <div className="form-section">
          <h3>Work Preferences</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Work Type</label>
              <select
                name="workPreferences.workType"
                value={formData.workPreferences.workType}
                onChange={handleChange}
              >
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
            <div className="form-group">
              <label>Preferred Location</label>
              <input
                type="text"
                name="workPreferences.preferredLocation"
                value={formData.workPreferences.preferredLocation}
                onChange={handleChange}
                placeholder="e.g., Mumbai, India"
              />
            </div>
            <div className="form-group">
              <label>Expected Salary (Annual)</label>
              <input
                type="text"
                name="workPreferences.expectedSalary"
                value={formData.workPreferences.expectedSalary}
                onChange={handleChange}
                placeholder="e.g., ₹800000"
              />
            </div>
            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="workPreferences.remoteWork"
                  checked={formData.workPreferences.remoteWork}
                  onChange={handleChange}
                />
                Open to Remote Work
              </label>
            </div>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}
        
        <button 
          type="button"
          onClick={getRecommendations}
          className="get-recommendations-btn"
          disabled={loading}
        >
          {loading ? 'Finding Best Matches...' : 'Get AI-Powered Recommendations'}
          <span className="btn-icon">→</span>
        </button>
      </div>

      {(jobs.length > 0 || companies.length > 0) && (
        <div className="recommendations-section">
          <h2>Your AI-Powered Recommendations</h2>
          
          {jobs.length > 0 && (
            <div className="job-recommendations">
              <h3>Recommended Jobs</h3>
              <div className="recommendations-grid">
                {jobs.map((job) => (
                  <div key={job.id} className="recommendation-card">
                    <h4>{job.title}</h4>
                    <p className="company">{job.company}</p>
                    <p className="location">{job.location}</p>
                    <p className="work-type">{job.work_type}</p>
                    {job.remote && <span className="remote-badge">Remote</span>}
                    <div className="match-score">
                      Match Score: {Math.round(job.match_score * 100)}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {companies.length > 0 && (
            <div className="company-recommendations">
              <h3>Recommended Companies</h3>
              <div className="recommendations-grid">
                {companies.map((company) => (
                  <div key={company.id} className="recommendation-card">
                    <h4>{company.title}</h4>
                    <p className="location">{company.location}</p>
                    <div className="match-score">
                      Match Score: {Math.round(company.match_score * 100)}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};



export default JobPreference;


