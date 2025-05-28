import React from 'react';
import { Link } from 'react-router-dom';

const SectionList = () => {
  const sections = [
    {
      name: 'Career Guidance',
      icon: '👩‍💼',
      description: 'Explore career opportunities',
      color: '#FF6B6B',
      url: '/user-profile', // Link to user profile form
    },
    // Other sections...
  ];

  return (
    <div className="section-list">
      {sections.map((section, index) => (
        <div key={index} className="section-item" style={{ backgroundColor: section.color }}>
          <h3>{section.icon} {section.name}</h3>
          <p>{section.description}</p>
          <Link to={section.url} className="section-list">
            Go to {section.name}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default SectionList;
