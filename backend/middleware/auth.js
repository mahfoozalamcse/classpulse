const jwt = require('jsonwebtoken');
const User = require('../models/User');

// 📌 Authenticate User
exports.authenticate = async (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ error: 'Access denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

// 📌 Authorize Roles (Student, Teacher, Admin)
exports.authorize = (role) => (req, res, next) => {
  if (req.user.role !== role) {
    return res.status(403).json({ error: 'Unauthorized' });
  }
  next();
};
