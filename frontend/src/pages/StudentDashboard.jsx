import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const [quizzes, setQuizzes] = useState([]); 
  const [attendance, setAttendance] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const headers = { Authorization: token };

      const quizRes = await axios.get("http://localhost:5000/api/quizzes", { headers });
      setQuizzes(quizRes.data);

      const attendanceRes = await axios.get("http://localhost:5000/api/attendance", { headers });
      setAttendance(attendanceRes.data.attendancePercentage);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Student Dashboard</h2>
      <p>Attendance: {attendance}%</p>
      <h3>Available Quizzes</h3>
      <ul>
        {quizzes.map((quiz) => (
          <li key={quiz._id}>
            {quiz.title} - {quiz.topic}
            <button onClick={() => navigate(`/quiz/${quiz._id}`)}>Start Quiz</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentDashboard;
