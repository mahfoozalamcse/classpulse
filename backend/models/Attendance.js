const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  totalQuizzes: { type: Number, default: 0 },
  quizzesPassed: { type: Number, default: 0 },
  attendancePercentage: { type: Number, default: 0 },
});

module.exports = mongoose.model('Attendance', AttendanceSchema);
