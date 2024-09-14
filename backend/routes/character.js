const express = require('express');
const Character = require('../models/Character');
const authenticateToken = require('../middleware/authmiddleware');

const router = express.Router();

// POST route to create a character
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { firstname, lastname, house } = req.body;

    if (!firstname || !lastname) {
      return res.status(400).json({ success: false, msg: 'Please enter all required fields' });
    }

    const newCharacter = new Character({
      firstname,
      lastname,
      house: house || null,
      user_id: req.user.id
    });

    const savedCharacter = await newCharacter.save();
    res.status(201).json({ success: true, data: savedCharacter });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, msg: 'Server error' });
  }
});

module.exports = router;
