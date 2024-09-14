// src/routes/auth.js
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Character = require('../models/Character');
const authenticateToken = require('../middleware/authmiddleware'); // Ensure correct import

const router = express.Router();
// Register Route
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    let user = await User.findOne({ username });
    if (user) return res.status(400).json({ msg: 'User already exists' });

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
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const payload = { user: { id: user._id.toString() } }; // Convert ObjectId to string
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.get('/characters', authenticateToken, async (req, res) => {
  // Log the user ID and its validity for debugging
  console.log('User ID as string:', req.user.id);
  console.log('Is valid ObjectId:', mongoose.Types.ObjectId.isValid(req.user.id));

  // Check if req.user.id is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(req.user.id)) {
    console.log('Invalid ObjectId:', req.user.id);
    return res.status(400).json({ msg: 'Invalid user ID' });
  }

  // Use 'new' keyword for ObjectId
  const userId = new mongoose.Types.ObjectId(req.user.id);

  try {
    // Find characters for the user
    const characters = await Character.find({ user_id: userId });
    res.json(characters);
  } catch (err) {
    // Log error and send server error response
    console.error('Error fetching students:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});
// Get user info by ID (returns only username)
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('username'); // Only select the username field

    if (!user) return res.status(404).json({ msg: 'User not found' });

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
module.exports = router;
