import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useFetch from "../../functions/fetch";
import { authContext } from "../../context/AuthProvider";
import Loading from "../Loading";

const QuizResults = () => {
  const { quizId } = useParams();
  const [attempt, setAttempt] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalMarks,setTotal]=useState(0);
  const { fetchQuiz, fetchAttempt ,fetchAnswers} = useFetch();
  const { baseUrl, dbUser } = useContext(authContext);
  const studentId = dbUser?.user_id;
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
  if (!dbUser) return; // don’t fetch until dbUser is available

  const fetchData = async () => {
    setLoading(true);
    try {
      const quizQues = await fetchQuiz(quizId); // questions without is_correct
      const quizAttempt = await fetchAttempt(quizId, studentId);
      const correctAnswer = await fetchAnswers(quizId); // has correct answers
     
      setTotal(correctAnswer.total);
      
      const questionsWithCorrect = quizQues.map((q) => {
        const correctForQ = correctAnswer.answers.find(
          (a) => a.quesId === q.ques_id
        );
        const newOptions = q.options.map((opt) => ({
          ...opt,
          is_correct: opt.option_id === correctForQ?.optionId,
        }));
        return {
          ...q,
          options: newOptions,
        };
      });

      setQuestions(questionsWithCorrect);
      setAttempt(quizAttempt?.attempt);
    } catch (err) {
      console.error("Error fetching quiz data", err);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [quizId, studentId, baseUrl]);

  const getBadgeColor = (percentage) => {
    if (percentage >= 80) return "bg-green-500";
    if (percentage >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  if (loading || !dbUser) {
    return <Loading />;
  }

 
  const score = attempt?.score || 0;
  const percentage = totalMarks > 0 ? (parseFloat(score) / totalMarks) * 100 : 0;
  
  return (
    <div className="h-min-screen max-w-4xl container mx-auto px-2 md:px-8 lg:px-16 py-10">
      <div className={`p-4 rounded ${getBadgeColor(percentage)}`}>
        <h2 className="text-lg font-bold">Your Score: {score}/{totalMarks}</h2>
        <p>Percentage: {percentage.toFixed(2)}%</p>
      </div>

      <div>
        {questions.map((ques, idx) =>{
         let studentAnswer = attempt?.answers?.find(
    (ans) => ans.ques_id === ques.ques_id
  )?.option_id;
         return (
          <div
            key={idx}
            className="flex flex-col p-4 md:p-8 border border-black my-5 rounded-lg"
          >
            <h3 className="font-semibold">{ques.quiz_text}</h3>
            <ul className="list-disc ml-5">
              {ques.options?.map((option, i) => {
                let textcolor = "text-black"; // default

                  if (option.is_correct) {
                    textcolor = "text-green-700 font-bold";
                  }
                  if (option.option_id === studentAnswer) {
                    if (option.is_correct) {
                      textcolor = "text-blue-500 font-bold";
                    } else {
                      textcolor = "text-red-500 font-bold";
                    }
                  }
              return (
                <li
                  key={i}
                  className={textcolor}
                >
                  {option.option_txt}
                </li>
              )})}
            </ul>
          </div>
        )})}
      </div>
      <div>
        <button className="btn" onClick={()=>{navigate(`${location.state}`,{replace: true,})}}>Go to Dashboard</button>
      </div>
    </div>
  );
};

export default QuizResults;
