// models/Character.js
const mongoose = require('mongoose');

// Define the Character schema
const CharacterSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  house:{
    type:String,
    enum:['Gryffindor', 'Hufflepuff', 'Ravenclaw', 'Slytherin']
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Link to the User model
    required: true
  }
},{
  versionKey: false // Disable the `__v` field

});

// Create and export the Character model
module.exports = mongoose.model('Character', CharacterSchema);
