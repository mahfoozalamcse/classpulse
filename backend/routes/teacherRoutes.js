const express = require("express");
const { createQuiz, getQuizzes, deleteQuiz } = require("../controllers/teacherController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create-quiz", authMiddleware, createQuiz);
router.get("/quizzes", authMiddleware, getQuizzes);
router.delete("/quiz/:id", authMiddleware, deleteQuiz);

module.exports = router;
