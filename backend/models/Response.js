const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  answers: [
    {
      questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
      answer: { type: String, required: true } // "Yes" or "No"
    }
  ],
  analysis: {
    Strengths: [String],
    Weaknesses: [String],
    Opportunities: [String],
    Threats: [String]
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Response', responseSchema);
