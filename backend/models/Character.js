// models/Character.js
const mongoose = require('mongoose');

const CharacterSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  house: { type: String, enum: ['Gryffindor', 'Hufflepuff', 'Ravenclaw', 'Slytherin'], default: null },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { versionKey: false });

module.exports = mongoose.model('Character', CharacterSchema);
