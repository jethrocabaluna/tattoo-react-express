const mongoose = require('mongoose');

const TattooSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  style: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Tattoo', TattooSchema);