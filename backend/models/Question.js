const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  category: { type: String, enum: ['Strengths', 'Weaknesses', 'Opportunities', 'Threats'], required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Question', questionSchema);
