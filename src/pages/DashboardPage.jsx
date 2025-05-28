import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider"; // Import authentication context
import "./DashboardPage.css";

const modules = [
  { name: "Job Preference", icon: "👩‍💼", description: "Explore career opportunities", color: "#FF6B6B", path: "/job-preference" },
  { name: "Mentorship", icon: "🤝", description: "Connect with mentors", color: "#4ECDC4", path: "/mentorship" },
  { name: "Skill Development", icon: "📚", description: "Learn new skills", color: "#45B7D1", path: "/skill-development" },
  { name: "Entrepreneurship", icon: "💼", description: "Start your own business", color: "#F7B731", path: "/entrepreneurship" },
  { name: "Financial Literacy", icon: "💰", description: "Manage your finances", color: "#6C5CE7", path: "/financial-literacy" },
  { name: "Health and Wellness", icon: "🧘‍♀️", description: "Take care of yourself", color: "#26de81", path: "/health-and-wellness" },
];

function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-background"></div>
      <header className="dashboard-header">
        <h1 className="logo">The Sashakt Nari</h1>
        <nav>
          <button onClick={handleProfileClick} className="nav-link">Profile</button>
          <Link to="/settings" className="nav-link">Settings</Link>
          <button onClick={handleLogout} className="nav-link logout-btn">Logout</button>
        </nav>
      </header>

      <main className="dashboard-main">
        <h2 className="welcome-message">Welcome, {user.name || 'Empowered Woman'}!</h2>
        <p className="sub-message">Your journey to success begins here. Explore our modules and unleash your potential.</p>

        <div className="module-grid">
          {modules.map((module, index) => (
            <div key={index} className="module-card" style={{ "--card-color": module.color }}>
              <div className="module-icon">{module.icon}</div>
              <h3>{module.name}</h3>
              <p>{module.description}</p>
              <Link to={module.path} className="explore-btn">
                Explore
              </Link>
            </div>
          ))}
        </div>
      </main>

      <footer className="dashboard-footer">
        <p>&copy; 2025 The Sashakt Nari. Empowering women to reach new heights.</p>
      </footer>
    </div>
  );
}

export default DashboardPage;
