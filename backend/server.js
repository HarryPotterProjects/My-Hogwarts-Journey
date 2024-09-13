const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Replace with the URL of your frontend
  credentials: true
}));
app.use(express.json()); // Parse JSON bodies

// Connect to MongoDB
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Default Route
app.get('/', (req, res) => {
  res.send('Welcome to Hogwarts!');
});

// User Authentication Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Character Routes
const characterRoutes = require('./routes/character');
app.use('/api/character', characterRoutes);


// Start the Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
