import React, { useEffect, useState } from "react";
import axios from "axios";

const TeacherDashboard = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [title, setTitle] = useState("");
  const [questions] = useState([{ questionText: "", options: [], correctAnswer: "" }]);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    const response = await axios.get("/api/teacher/quizzes", { withCredentials: true });
    setQuizzes(response.data);
  };

  const createQuiz = async () => {
    await axios.post("/api/teacher/create-quiz", { title, questions }, { withCredentials: true });
    fetchQuizzes();
  };

  const deleteQuiz = async (id) => {
    await axios.delete(`/api/teacher/quiz/${id}`, { withCredentials: true });
    fetchQuizzes();
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold">Teacher Dashboard</h2>

      {/* Create Quiz Form */}
      <div className="mt-4 p-4 border rounded-lg">
        <input
          type="text"
          placeholder="Quiz Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full"
        />
        <button onClick={createQuiz} className="bg-blue-500 text-white p-2 mt-2 rounded">
          Create Quiz
        </button>
      </div>

      {/* Display Quizzes */}
      <div className="mt-5">
        <h3 className="text-xl font-bold">Your Quizzes</h3>
        {quizzes.map((quiz) => (
          <div key={quiz._id} className="border p-3 mt-3 rounded">
            <h4 className="text-lg font-semibold">{quiz.title}</h4>
            <button onClick={() => deleteQuiz(quiz._id)} className="bg-red-500 text-white p-2 rounded mt-2">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherDashboard;

