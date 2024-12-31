// models/Location.js
const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  addressType : {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
