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
  }
},{
  versionKey: false // Disable the `__v` field

});

// Create and export the User model
module.exports = mongoose.model('User', UserSchema);
