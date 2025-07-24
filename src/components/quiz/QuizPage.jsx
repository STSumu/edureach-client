import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import QuizResults from "./QuizResults";
import QuizHeader from "./QuizHeader";
import QuestionCard from "./QuestionCard";
import QuizNavigation from "./QuizNavigation";
import { authContext } from "../../context/AuthProvider";
import useFetch from "../../functions/fetch";
import Swal from "sweetalert2";


const QuizPage = () => {
  const { quizId } = useParams();
  const { baseUrl,dbUser } = useContext(authContext);
  const {fetchQuiz}=useFetch();
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [totalMarks, setTotalMarks] = useState(0);
  const navigate=useNavigate();
  const location=useLocation();

  useEffect(() => {
  const fetchData = async () => {
      try {
        const quizQues = await fetchQuiz(quizId);
        setQuestions(quizQues);
        const totalMarks=Number(quizQues[0].total_mark);
        setTotalMarks(totalMarks);
        setLoading(false);
      } catch (err) {
      console.error('Failed to fetch quizzes:', err);
      setError(err.message);
      setLoading(false);
    }
  }
  if(quizId){
    fetchData();
    
  }
}, [quizId, baseUrl]);

  const handleOptionSelect = (quesId, optionId) => {
 
    setSelectedOptions((prev) => {
      const updated = [...prev];
      const existingIndex = updated.findIndex(sel => sel.ques_id === quesId);

      if (existingIndex !== -1) {
        updated[existingIndex].option_id = optionId; 
      } else {
        updated.push({ ques_id: quesId, option_id: optionId }); 
      }
      return updated;
  })
  
  
};



  const handleSubmit = () => {
    const submit={
      studentId:dbUser.user_id,
      quizId:quizId,
      answers:selectedOptions,
    }
    fetch(`${baseUrl}/quizattempt/submit-quiz`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(submit),
    })
    .then((res) => res.json())
          .then((data) => {
            if (data.attempt_id) {
              Swal.fire({
                title: 'Successfully submited the quiz.',
                text: 'See Results',
                icon: 'success',
                showCancelButton: true,
                confirmButtonText: 'See Results',
                cancelButtonText: 'Go to Dashboard',
              }).then((result) => {
                if (result.isConfirmed) {
                  navigate(`/enrolled/quiz/result/${quizId}`, {
    state: location.state,
    replace: true, 
  });
                }
                else{
                  navigate(`${location.state}`)
                }
              });
            } else {
              alert('Failed to add to cart.');
            }
          });
    
  };

  

  if (loading) return <p className="mt-20 text-center">Loading quiz...</p>;
  if (error) return <p className="mt-20 text-center text-red-600">Error: {error}</p>;
  if (!questions.length) return <p className="mt-20 text-center">No questions found.</p>;
 
  const currentQuestion = questions[currentIndex];
  const marksPerQuestion = totalMarks / questions.length;

  return (
    <div className="quiz-container my-20 max-w-3xl mx-auto p-6">
      <QuizHeader currentIndex={currentIndex} totalQuestions={questions.length} marksPerQuestion={marksPerQuestion} />
      <QuestionCard
        question={currentQuestion}
        selectedOptions={selectedOptions}
        handleOptionSelect={handleOptionSelect}
      />
      <QuizNavigation
        currentIndex={currentIndex}
        totalQuestions={questions.length}
        handlePrev={() => setCurrentIndex((i) => i - 1)}
        handleNext={() => setCurrentIndex((i) => i + 1)}
        handleSubmit={handleSubmit}
        selectedCount={Object.keys(selectedOptions).length}
      />
    </div>
  );
};

export default QuizPage;
