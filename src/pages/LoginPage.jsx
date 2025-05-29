import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { loginUser } from "../services/api";
import { useAuth } from "../AuthProvider";
import "./auth.css";

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await loginUser(formData);
      login(response.user); // Store user data in AuthContext
      navigate('/dashboard'); // Redirect to dashboard after successful login
    } catch (err) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const handleGuestAccess = () => {
    // Create a guest user object with limited access
    const guestUser = {
      isGuest: true,
      email: 'guest@example.com',
      name: 'Guest User'
    };
    login(guestUser);
    navigate('/dashboard');
  };

  return (
    <div className="login-page">
      <div className="login-background"></div>
      <motion.div
        className="login-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo.jpg-iudkGA6LVrBg6MCLLO4jwx9bXYFpdP.jpeg"
          alt="The Sashakt Nari Logo"
          className="auth-logo"
        />
        <h1 className="gradient-text">Welcome Back</h1>
        <p className="auth-subtitle">Sign in to continue your journey</p>
        {error && <div className="error-message">{error}</div>}
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <div className="form-decoration"></div>
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <div className="form-decoration"></div>
          </div>
          <motion.button
            type="submit"
            className="auth-btn"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </motion.button>
        </form>
        <div className="auth-links">
          <Link to="/forgot-password" className="forgot-link">Forgot Password?</Link>
        </div>
        <div className="guest-access">
          <motion.button
            onClick={handleGuestAccess}
            className="guest-btn"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            View as Guest
          </motion.button>
        </div>
        <p className="signup-text">
          Don't have an account? <Link to="/signup" className="link">Sign up</Link>
        </p>
      </motion.div>
    </div>
  );
}

export default LoginPage;
