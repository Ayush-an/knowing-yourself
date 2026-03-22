const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Question = require('../models/Question');
const Response = require('../models/Response');
const User = require('../models/User');

// Middleware to verify Admin
const adminAuth = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied, admin only' });
    }
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Add Question
router.post('/questions', adminAuth, async (req, res) => {
  try {
    const { question, category } = req.body;
    const newQuestion = new Question({ question, category });
    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete Question
router.delete('/questions/:id', adminAuth, async (req, res) => {
  try {
    await Question.findByIdAndDelete(req.params.id);
    res.json({ message: 'Question deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get All User Responses
router.get('/responses', adminAuth, async (req, res) => {
  try {
    const responses = await Response.find().populate('user', 'name mobileNumber occupation age gender').populate('answers.questionId', 'question category');
    res.json(responses);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
