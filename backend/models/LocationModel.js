const mongoose = require('mongoose');


const locationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,  
  },
  address: {
    street: {
      type: String,
      required: true, 
    },
    city: {
      type: String,
      required: true, 
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true, 
    },
    postalCode: {
      type: String
    },
    fullAddress: {
      type: String,  
      default: function () {
        return `${this.street}, ${this.city}, ${this.state}, ${this.country} - ${this.postalCode}`;
      },
    },
  },
  latitude: {
    type: Number,
    required: true, 
  },
  longitude: {
    type: Number,
    required: true, 
  },
  addressType: {
    type: String,
    default: 'Home', 
  },
  createdAt: {
    type: Date,
    default: Date.now, 
  },
  user: {  
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true, 
  },
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
