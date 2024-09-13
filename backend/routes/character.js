const express = require('express');
const Character = require('../models/Character');
const authenticateToken = require('../middleware/authmiddleware'); // Update import

const router = express.Router();

// POST route to create a character
router.post('/create-character', authenticateToken, async (req, res) => {
  try {
    const { firstname, lastname, house } = req.body;

    if (!firstname || !lastname || !house) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }

    // Create the character associated with the logged-in user
    const newCharacter = new Character({
      firstname,
      lastname,
      house,
      user_id: req.user.user.id // Ensure req.user.user.id is correct
    });

    // Save character to database
    const savedCharacter = await newCharacter.save();

    res.status(201).json(savedCharacter);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// GET route to fetch characters by user ID
router.get('/user/:userId', authenticateToken, async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch characters associated with the provided user ID
    const characters = await Character.find({ user_id: userId });

    if (!characters.length) return res.status(404).json({ msg: 'No characters found for this user' });

    res.json(characters);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


module.exports = router;
