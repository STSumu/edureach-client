import { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import useFetch from '../../functions/fetch';
import { useContext } from 'react';
import { authContext } from '../../context/AuthProvider';

const ChooseQuizPage = ({courseId}) => {
  const navigate = useNavigate();
  const {baseUrl,dbUser}=useContext(authContext);
  const {fetchAttempt}=useFetch()
  const [quizes,setQuizes]=useState([]);
  const location=useLocation();
  
  useEffect(() => {
    fetch(`${baseUrl}/quiz/${courseId}`)
      .then(res => res.json())
      .then(data => {
        setQuizes(data);
      })
      .catch(err => console.error('Failed to fetch quiz count:', err));
  }, [courseId]);


 const handleChoose = async (quizId) => {
    try {
      const attempt = await fetchAttempt(quizId, dbUser.student_id);
      if(!attempt.found){
        navigate(`/enrolled/quiz/${quizId}`,{ state: location.pathname });
      }
      else {
  
      navigate(`/enrolled/quiz/result/${quizId}`,{ state: location.pathname });
    }
      
    } catch (err) {
      console.error('Failed to fetch attempt:', err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-8 bg-[#fcf5e5] py-16">
      <h1 className="mb-5 text-4xl font-bold text-[#b54343] ">Choose a Quiz</h1>
      <div className="space-y-4 w-full max-w-md">
        {quizes.map((quizId, index) => (
          <button
            key={index + 1}
            onClick={() => handleChoose(quizId.quiz_id)}
            className="w-full py-3 text-lg bg-[#cb522e] text-white rounded-lg hover:bg-[#a03b3b] transition"
          >
            Quiz {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChooseQuizPage;
