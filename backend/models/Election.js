const mongoose = require('mongoose');

const electionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  candidates: [{ name: String, votes: { type: Number, default: 0 } }],
  isActive: { type: Boolean, default: true }
});

module.exports = mongoose.model('Election', electionSchema);
