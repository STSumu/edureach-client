import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import QuizResults from "./QuizResults";
import QuizHeader from "./QuizHeader";
import QuestionCard from "./QuestionCard";
import QuizNavigation from "./QuizNavigation";
import { authContext } from "../../context/AuthProvider";


const QuizPage = () => {
  const { quizId } = useParams();
  const { baseUrl } = useContext(authContext);

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [showAnswers, setShowAnswers] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [quizResults, setQuizResults] = useState(null);
  const [totalMarks, setTotalMarks] = useState(0);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setLoading(true);
        const url = baseUrl ? `${baseUrl}/question/${quizId}` : `/quiz/${quizId}`;
        const res = await axios.get(url);
        if (res.data?.length) {
          setQuestions(res.data);
          setTotalMarks(res.data[0]?.total_mark || 0);
        } else {
          setError("No questions found for this quiz");
        }
      } catch (e) {
        setError(e.response?.data?.message || "Failed to load quiz");
      } finally {
        setLoading(false);
      }
    };
    if (quizId) fetchQuiz();
  }, [quizId, baseUrl]);

  const handleOptionSelect = (quesId, optionId) => {
    if (!showAnswers) {
      setSelectedOptions((prev) => ({ ...prev, [quesId]: optionId }));
    }
  };

  const calculateResults = () => {
    const marksPerQ = totalMarks / questions.length;
    let correctCount = 0;
    const results = questions.map((q) => {
      const selectedId = selectedOptions[q.ques_id];
      const correct = q.options.find((o) => o.is_correct);
      const isCorrect = selectedId === correct?.option_id;
      if (isCorrect) correctCount++;
      return {
        question: q.quiz_text,
        selectedOption: q.options.find((o) => o.option_id === selectedId)?.option_txt || "No Answer",
        correctOption: correct?.option_txt,
        isCorrect,
        marks: isCorrect ? marksPerQ : 0,
      };
    });
    const totalScore = correctCount * marksPerQ;
    const percentage = (correctCount / questions.length) * 100;
    return {
      correctAnswers: correctCount,
      totalQuestions: questions.length,
      totalScore,
      totalMarks,
      percentage,
      marksPerQuestion: marksPerQ,
      results,
    };
  };

  const handleSubmit = () => {
    const results = calculateResults();
    setQuizResults(results);
    setShowAnswers(true);
    setShowResults(true);
  };

  const handleRetake = () => {
    setSelectedOptions({});
    setCurrentIndex(0);
    setShowAnswers(false);
    setShowResults(false);
    setQuizResults(null);
  };

  if (loading) return <p className="mt-20 text-center">Loading quiz...</p>;
  if (error) return <p className="mt-20 text-center text-red-600">Error: {error}</p>;
  if (!questions.length) return <p className="mt-20 text-center">No questions found.</p>;
  if (showResults) return <QuizResults quizResults={quizResults} handleRetake={handleRetake} />;

  const currentQuestion = questions[currentIndex];
  const marksPerQuestion = totalMarks / questions.length;

  return (
    <div className="quiz-container my-20 max-w-3xl mx-auto p-6">
      <QuizHeader currentIndex={currentIndex} totalQuestions={questions.length} marksPerQuestion={marksPerQuestion} />
      <QuestionCard
        question={currentQuestion}
        selectedOptions={selectedOptions}
        handleOptionSelect={handleOptionSelect}
        showAnswers={showAnswers}
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
