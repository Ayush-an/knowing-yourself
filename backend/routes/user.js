const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Question = require('../models/Question');
const Response = require('../models/Response');
const Task = require('../models/Task');

// Middleware to verify JWT
const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Get User Profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get Questions for Test
router.get('/questions', async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Submit Test Responses
router.post('/submit-test', auth, async (req, res) => {
  try {
    const { answers } = req.body; // answers: [{ questionId, answer }]
    
    const analysis = {
      Strengths: [],
      Weaknesses: [],
      Opportunities: [],
      Threats: []
    };

    for (let item of answers) {
      const question = await Question.findById(item.questionId);
      if (question && item.answer && item.answer.trim() !== "") {
        analysis[question.category].push(item.answer);
      }
    }

    const response = new Response({
      user: req.user.userId,
      answers,
      analysis
    });

    await response.save();
    res.status(201).json(response);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get Latest SWOT Analysis
router.get('/swot', auth, async (req, res) => {
  try {
    const response = await Response.findOne({ user: req.user.userId }).sort({ createdAt: -1 });
    res.json(response ? response.analysis : null);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Task Management Routes
router.get('/tasks', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.userId }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/tasks', auth, async (req, res) => {
  try {
    const { text } = req.body;
    const task = new Task({ user: req.user.userId, text });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/tasks/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user.userId });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    
    task.completed = !task.completed;
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/tasks/:id', auth, async (req, res) => {
  try {
    const result = await Task.deleteOne({ _id: req.params.id, user: req.user.userId });
    if (result.deletedCount === 0) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
