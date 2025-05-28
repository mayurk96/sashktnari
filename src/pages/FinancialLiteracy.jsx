import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './FinancialLiteracy.css';

function FinancialLiteracy() {
  const [activeTab, setActiveTab] = useState('banking');
  const [accountType, setAccountType] = useState('');
  const [transactionAmount, setTransactionAmount] = useState('');
  const [investmentAmount, setInvestmentAmount] = useState('');

  const handleSubmit = (e, formType) => {
    e.preventDefault();
    // Here you would typically send the data to a backend API
    console.log(`Submitted ${formType} form`);
    // Reset form fields
    if (formType === 'banking') setAccountType('');
    if (formType === 'transaction') setTransactionAmount('');
    if (formType === 'investment') setInvestmentAmount('');
  };

  return (
    <div className="financial-literacy-page">
      <header className="page-header">
        <h1>Financial Literacy</h1>
        <Link to="/dashboard" className="back-link">Back to Dashboard</Link>
      </header>
      <main className="page-content">
        <nav className="tab-navigation">
          <button 
            className={`tab-button ${activeTab === 'banking' ? 'active' : ''}`}
            onClick={() => setActiveTab('banking')}
          >
            Banking
          </button>
          <button 
            className={`tab-button ${activeTab === 'transactions' ? 'active' : ''}`}
            onClick={() => setActiveTab('transactions')}
          >
            Transactions
          </button>
          <button 
            className={`tab-button ${activeTab === 'investments' ? 'active' : ''}`}
            onClick={() => setActiveTab('investments')}
          >
            Investments
          </button>
          <button 
            className={`tab-button ${activeTab === 'stock-market' ? 'active' : ''}`}
            onClick={() => setActiveTab('stock-market')}
          >
            Stock Market
          </button>
          <button 
            className={`tab-button ${activeTab === 'mutual-funds' ? 'active' : ''}`}
            onClick={() => setActiveTab('mutual-funds')}
          >
            Mutual Funds
          </button>
        </nav>

        <div className="tab-content">
          {activeTab === 'banking' && (
            <div className="banking-section">
              <h2>Banking Details</h2>
              <form onSubmit={(e) => handleSubmit(e, 'banking')}>
                <select
                  value={accountType}
                  onChange={(e) => setAccountType(e.target.value)}
                  required
                >
                  <option value="">Select Account Type</option>
                  <option value="savings">Savings Account</option>
                  <option value="current">Current Account</option>
                  <option value="fixed-deposit">Fixed Deposit</option>
                </select>
                <button type="submit" className="submit-btn">Get Account Details</button>
              </form>
              <div className="banking-info">
                <h3>Banking Basics:</h3>
                <ul>
                  <li>Understanding different types of bank accounts</li>
                  <li>How to open a bank account</li>
                  <li>Understanding interest rates and fees</li>
                  <li>Online and mobile banking services</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'transactions' && (
            <div className="transactions-section">
              <h2>Transaction Assistance</h2>
              <form onSubmit={(e) => handleSubmit(e, 'transaction')}>
                <input
                  type="number"
                  value={transactionAmount}
                  onChange={(e) => setTransactionAmount(e.target.value)}
                  placeholder="Enter transaction amount (₹)"
                  required
                />
                <button type="submit" className="submit-btn">Process Transaction</button>
              </form>
              <div className="transaction-info">
                <h3>Transaction Tips:</h3>
                <ul>
                  <li>Always verify the recipient's details before sending money</li>
                  <li>Keep your transaction receipts for record-keeping</li>
                  <li>Set up alerts for large transactions</li>
                  <li>Use secure payment methods for online transactions</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'investments' && (
            <div className="investments-section">
              <h2>Investment Platform</h2>
              <form onSubmit={(e) => handleSubmit(e, 'investment')}>
                <input
                  type="number"
                  value={investmentAmount}
                  onChange={(e) => setInvestmentAmount(e.target.value)}
                  placeholder="Enter investment amount (₹)"
                  required
                />
                <button type="submit" className="submit-btn">Explore Investment Options</button>
              </form>
              <div className="investment-options">
                <h3>Popular Investment Options:</h3>
                <ul>
                  <li>Fixed Deposits</li>
                  <li>Recurring Deposits</li>
                  <li>Public Provident Fund (PPF)</li>
                  <li>National Savings Certificate (NSC)</li>
                  <li>Mutual Funds</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'stock-market' && (
            <div className="stock-market-section">
              <h2>Stock Market Information</h2>
              <div className="stock-market-info">
                <h3>Stock Market Basics:</h3>
                <ul>
                  <li>What is a stock market and how does it work?</li>
                  <li>Understanding stock prices and market indices</li>
                  <li>How to buy and sell stocks</li>
                  <li>Risks and rewards of stock market investing</li>
                </ul>
                <a href="#" className="learn-more-link">Learn More About Stock Market</a>
              </div>
              <div className="stock-simulator">
                <h3>Stock Market Simulator</h3>
                <p>Practice trading stocks without risking real money!</p>
                <button className="simulator-btn">Try Stock Simulator</button>
              </div>
            </div>
          )}

          {activeTab === 'mutual-funds' && (
            <div className="mutual-funds-section">
              <h2>Mutual Funds</h2>
              <div className="mutual-funds-info">
                <h3>Understanding Mutual Funds:</h3>
                <ul>
                  <li>What are mutual funds?</li>
                  <li>Types of mutual funds</li>
                  <li>How to invest in mutual funds</li>
                  <li>Calculating returns and understanding NAV</li>
                </ul>
                <a href="#" className="learn-more-link">Learn More About Mutual Funds</a>
              </div>
              <div className="fund-comparison">
                <h3>Fund Comparison Tool</h3>
                <p>Compare different mutual funds to find the best fit for your investment goals.</p>
                <button className="comparison-btn">Compare Funds</button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default FinancialLiteracy;

