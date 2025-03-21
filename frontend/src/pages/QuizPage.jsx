import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
 
const QuizPage = () => {
  const { id } = useParams(); 
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      const res = await axios.get(`http://localhost:5000/api/quizzes/${id}`);
      setQuiz(res.data);
      setAnswers(new Array(res.data.questions.length).fill(""));
    };
    fetchQuiz();
  }, [id]);

  const handleSubmit = async () => {
    const res = await axios.post("http://localhost:5000/api/quizzes/submit", { quizId: id, answers });
    setScore(res.data.score);
  };

  return (
    <div>
      {quiz ? (
        <>
          <h2>{quiz.title}</h2>
          {quiz.questions.map((q, index) => (
            <div key={index}>
              <p>{q.questionText}</p>
              {q.options.map((option, i) => (
                <label key={i}>
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={option}
                    onChange={() => {
                      const newAnswers = [...answers];
                      newAnswers[index] = option;
                      setAnswers(newAnswers);
                    }}
                  />
                  {option}
                </label>
              ))}
            </div>
          ))}
          <button onClick={handleSubmit}>Submit Quiz</button>
          {score !== null && <p>Your Score: {score}</p>}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default QuizPage;
