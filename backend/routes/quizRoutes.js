const express = require('express');
const Quiz = require('../models/Quiz');
const { authenticate, authorize } = require('../middleware/auth');
const router = express.Router();

// 📌 Create Quiz (Teacher only)
router.post('/create', authenticate, authorize('teacher'), async (req, res) => {
  try {
    const { title, topic, questions } = req.body;
    const quiz = new Quiz({ title, topic, questions, createdBy: req.user.id });
    await quiz.save();
    res.status(201).json({ message: 'Quiz created successfully', quiz });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// 📌 Get All Quizzes
router.get('/', async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;


const Attendance = require('../models/Attendance');

// 📌 Submit Quiz (Student)
router.post('/submit', authenticate, authorize('student'), async (req, res) => {
  try {
    const { quizId, answers } = req.body;
    const quiz = await Quiz.findById(quizId);
    
    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });

    let score = 0;
    quiz.questions.forEach((q, index) => {
      if (answers[index] === q.correctAnswer) score++;
    });

    const percentage = (score / quiz.questions.length) * 100;

    // 📌 Update Attendance if score > 60%
    let attendance = await Attendance.findOne({ studentId: req.user.id });
    if (!attendance) {
      attendance = new Attendance({ studentId: req.user.id });
    }

    attendance.totalQuizzes += 1;
    if (percentage >= 60) attendance.quizzesPassed += 1;
    attendance.attendancePercentage = (attendance.quizzesPassed / attendance.totalQuizzes) * 100;

    await attendance.save();
    res.json({ message: 'Quiz submitted', score, percentage, attendance });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

