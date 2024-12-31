
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Location = require('./LocationModel'); 

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  locations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location',
  }],
  favouriteLocations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
