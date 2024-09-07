// models/User.js
const mongoose = require('mongoose');

// Define the User schema
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  house: {
    type: String,
    enum: ['Gryffindor', 'Hufflepuff', 'Ravenclaw', 'Slytherin'], // Optional: restrict values to Hogwarts houses
    default: null, // Optional: set default value if not provided
  },
},{
  versionKey: false // Disable the `__v` field

});

// Create and export the User model
module.exports = mongoose.model('User', UserSchema);
