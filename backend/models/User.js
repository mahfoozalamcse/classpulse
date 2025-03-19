const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['student', 'teacher', 'admin'], required: true },
  attendance: { type: Number, default: 0 }, // Attendance % for students
});

module.exports = mongoose.model('User', UserSchema);
