const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./server/config/db');
const User = require('./models/User');

// Load environment variables
dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', require('./routes/userRoutes'));

// Test route to verify database connection
app.get('/api/test-db', async (req, res) => {
  try {
    // Try to create a test user
    const testUser = await User.create({
      name: 'Test User',
      email: 'test@example.com',
      password: 'test123'
    });
    
    // Try to find the user
    const foundUser = await User.findOne({ email: 'test@example.com' });
    
    // Delete the test user
    await User.deleteOne({ email: 'test@example.com' });
    
    res.json({
      message: 'Database connection successful!',
      testUser: foundUser ? 'User created and found successfully' : 'Error finding user',
      databaseStatus: 'Connected'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Database connection error',
      error: error.message,
      databaseStatus: 'Error'
    });
  }
});

// Basic route for testing
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend server is running!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 
