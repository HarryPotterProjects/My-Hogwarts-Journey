// routes/auth.js
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/User'); // Adjust path if needed

// Register Route
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ username });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    // Create a new user
    user = new User({
      username,
      password: await bcrypt.hash(password, 10),
    });

    await user.save();
    res.status(201).json({ msg: 'User registered successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user by username
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    // Generate JWT token
    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
// TOKEN authenticate 
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.error('Token verification error:', err.message); // Debugging statement
      return res.sendStatus(403);
    }
    req.user = user; // Attach user info to request
    next();
  });
};

// get login info by ID 
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password'); // Exclude password from response

    if (!user) return res.status(404).json({ msg: 'User not found' });

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.put('/update-house', authenticateToken, async (req, res) => {
  const { house } = req.body;
  const validHouses = ['Gryffindor', 'Hufflepuff', 'Ravenclaw', 'Slytherin'];

  // Validate house value
  if (house && !validHouses.includes(house)) {
    return res.status(400).json({ msg: 'Invalid house selection' });
  }

  try {
    const userId = req.user.user.id; // Correctly access user ID
    console.log('User ID from token:', userId);
    // Find and update the user using the ID from the token
    const user = await User.findById(req.user.user.id);
    console.log('User found in database:', user);

    if (!user) {
      console.log('User not found');
      return res.status(404).json({ msg: 'User not found' });
    }

    user.house = house;
    await user.save();

    res.json({ msg: 'House updated successfully', user });
  } catch (err) {
    console.error('Server error:', err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
