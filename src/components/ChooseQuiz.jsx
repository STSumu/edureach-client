import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ChooseQuizPage = () => {
  const navigate = useNavigate();
  const [quizes,setQuizes]=useState([]);
  const [quizCount, setQuizCount] = useState(0);
  const courseId = 1; // Replace with dynamic value if needed

  useEffect(() => {
    fetch(`http://localhost:4000/quiz/${courseId}`)
      .then(res => res.json())
      .then(data => {
        setQuizes(data);
      })
      .catch(err => console.error('Failed to fetch quiz count:', err));
  }, [courseId]);

  const handleChoose = (quizId) => {
    navigate(`/quiz/${quizId}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fcf5e5] px-6">
      <h1 className="text-4xl font-bold text-[#b54343] mb-8">Choose a Quiz</h1>

      <div className="space-y-4 w-full max-w-md">
        {quizes.map((quizId, index) => (
          <button
            key={index + 1}
            onClick={() => handleChoose(quizId.quiz_id)}
            className="w-full py-3 text-lg bg-[#b54343] text-white rounded-lg hover:bg-[#a03b3b] transition"
          >
            Quiz {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChooseQuizPage;
