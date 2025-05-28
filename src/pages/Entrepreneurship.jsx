import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Entrepreneurship.css';

function Entrepreneurship() {
  const [activeTab, setActiveTab] = useState('start-business');
  const [businessIdea, setBusinessIdea] = useState('');
  const [fundingAmount, setFundingAmount] = useState('');
  const [marketplaceItem, setMarketplaceItem] = useState('');

  const handleSubmit = (e, formType) => {
    e.preventDefault();
    // Here you would typically send the data to a backend API
    console.log(`Submitted ${formType} form`);
    // Reset form fields
    if (formType === 'business-idea') setBusinessIdea('');
    if (formType === 'funding') setFundingAmount('');
    if (formType === 'marketplace') setMarketplaceItem('');
  };

  return (
    <div className="entrepreneurship-page">
      <header className="page-header">
        <h1>Entrepreneurship</h1>
        <Link to="/dashboard" className="back-link">Back to Dashboard</Link>
      </header>
      <main className="page-content">
        <nav className="tab-navigation">
          <button 
            className={`tab-button ${activeTab === 'start-business' ? 'active' : ''}`}
            onClick={() => setActiveTab('start-business')}
          >
            Start a Business
          </button>
          <button 
            className={`tab-button ${activeTab === 'guidelines' ? 'active' : ''}`}
            onClick={() => setActiveTab('guidelines')}
          >
            Guidelines & Help
          </button>
          <button 
            className={`tab-button ${activeTab === 'funding' ? 'active' : ''}`}
            onClick={() => setActiveTab('funding')}
          >
            Funding
          </button>
          <button 
            className={`tab-button ${activeTab === 'schemes' ? 'active' : ''}`}
            onClick={() => setActiveTab('schemes')}
          >
            Government Schemes
          </button>
          <button 
            className={`tab-button ${activeTab === 'marketplace' ? 'active' : ''}`}
            onClick={() => setActiveTab('marketplace')}
          >
            Marketplace
          </button>
        </nav>

        <div className="tab-content">
          {activeTab === 'start-business' && (
            <div className="start-business-section">
              <h2>Start Your Business</h2>
              <form onSubmit={(e) => handleSubmit(e, 'business-idea')}>
                <textarea
                  value={businessIdea}
                  onChange={(e) => setBusinessIdea(e.target.value)}
                  placeholder="Describe your business idea..."
                  required
                />
                <button type="submit" className="submit-btn">Submit Idea</button>
              </form>
            </div>
          )}

          {activeTab === 'guidelines' && (
            <div className="guidelines-section">
              <h2>Guidelines & Help</h2>
              <ul>
                <li>
                  <h3>Business Plan Development</h3>
                  <p>Learn how to create a comprehensive business plan.</p>
                  <a href="#" className="resource-link">View Guide</a>
                </li>
                <li>
                  <h3>Legal Requirements</h3>
                  <p>Understand the legal aspects of starting a business in India.</p>
                  <a href="#" className="resource-link">View Guide</a>
                </li>
                <li>
                  <h3>Marketing Strategies</h3>
                  <p>Explore effective marketing strategies for small businesses.</p>
                  <a href="#" className="resource-link">View Guide</a>
                </li>
              </ul>
            </div>
          )}

          {activeTab === 'funding' && (
            <div className="funding-section">
              <h2>Funding Opportunities</h2>
              <form onSubmit={(e) => handleSubmit(e, 'funding')}>
                <input
                  type="number"
                  value={fundingAmount}
                  onChange={(e) => setFundingAmount(e.target.value)}
                  placeholder="Required funding amount (₹)"
                  required
                />
                <button type="submit" className="submit-btn">Find Opportunities</button>
              </form>
              <div className="funding-options">
                <h3>Available Funding Options:</h3>
                <ul>
                  <li>Micro-finance Institutions</li>
                  <li>Government Grants</li>
                  <li>Angel Investors</li>
                  <li>Crowdfunding Platforms</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'schemes' && (
            <div className="schemes-section">
              <h2>Government Schemes for Women Entrepreneurs</h2>
              <ul>
                <li>
                  <h3>Bharatiya Mahila Bank Business Loan</h3>
                  <p>Loans up to ₹20 crores for women-owned businesses.</p>
                  <a href="#" className="scheme-link">Learn More</a>
                </li>
                <li>
                  <h3>Mudra Yojana Scheme</h3>
                  <p>Loans up to ₹10 lakhs for micro-units.</p>
                  <a href="#" className="scheme-link">Learn More</a>
                </li>
                <li>
                  <h3>Dena Shakti Scheme</h3>
                  <p>Loans up to ₹20 lakhs for women entrepreneurs in agriculture, manufacturing, micro-credit, retail, and small enterprises.</p>
                  <a href="#" className="scheme-link">Learn More</a>
                </li>
              </ul>
            </div>
          )}

          {activeTab === 'marketplace' && (
            <div className="marketplace-section">
              <h2>Marketplace</h2>
              <form onSubmit={(e) => handleSubmit(e, 'marketplace')}>
                <input
                  type="text"
                  value={marketplaceItem}
                  onChange={(e) => setMarketplaceItem(e.target.value)}
                  placeholder="What do you want to buy or sell?"
                  required
                />
                <button type="submit" className="submit-btn">Search Marketplace</button>
              </form>
              <div className="marketplace-categories">
                <h3>Popular Categories:</h3>
                <ul>
                  <li>Handmade Crafts</li>
                  <li>Organic Products</li>
                  <li>Clothing and Accessories</li>
                  <li>Home Decor</li>
                  <li>Food and Beverages</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Entrepreneurship;
