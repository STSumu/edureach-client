import React from "react";
import { useNavigate } from "react-router-dom";

const QuizResults = ({ quizResults, handleRetake }) => {
  const navigate = useNavigate();

  const getBadgeColor = () => {
    if (quizResults.percentage >= 80) return "bg-green-600";
    if (quizResults.percentage >= 60) return "bg-yellow-500";
    return "bg-red-600";
  };

  return (
    <div className="mt-10 max-w-3xl mx-auto p-6">
      <h2 className="text-center text-2xl font-bold mb-8">Quiz Results</h2>

      {/* Score Summary */}
      <div className="bg-gray-100 p-6 rounded-lg text-center mb-8">
        <h3 className="text-blue-600 text-lg mb-2">Your Score</h3>
        <p className="text-2xl font-bold mb-1">
          {quizResults.totalScore.toFixed(1)} / {quizResults.totalMarks}
        </p>
        <p className="text-gray-600">
          {quizResults.correctAnswers} out of {quizResults.totalQuestions} correct
        </p>
        <p className="text-gray-500">({quizResults.percentage.toFixed(1)}%)</p>
      </div>

      {/* Badge */}
      <div className="text-center mb-8">
        <span className={`px-5 py-2 rounded-full text-white font-bold ${getBadgeColor()}`}>
          {quizResults.percentage >= 80
            ? "Excellent!"
            : quizResults.percentage >= 60
            ? "Good Job!"
            : "Keep Practicing!"}
        </span>
      </div>

      {/* Detailed Review */}
      <h4 className="text-xl font-semibold mb-4">Question Review</h4>
      {quizResults.results.map((result, i) => (
        <div key={i} className="bg-white border border-gray-200 rounded p-4 mb-4">
          <h5 className="font-medium mb-2">Question {i + 1}: {result.question}</h5>
          <p className="mb-1">
            <strong>Your Answer:</strong>{" "}
            <span className={result.isCorrect ? "text-green-600" : "text-red-600"}>
              {result.selectedOption} {result.isCorrect ? "✓" : "✗"}
            </span>
          </p>
          {!result.isCorrect && (
            <p className="mb-1">
              <strong>Correct Answer:</strong>{" "}
              <span className="text-green-600">{result.correctOption}</span>
            </p>
          )}
          <p>
            <strong>Marks:</strong> {result.marks.toFixed(1)} / {quizResults.marksPerQuestion.toFixed(1)}
          </p>
        </div>
      ))}

      {/* Buttons */}
      <div className="text-center mt-6">
        <button
          onClick={handleRetake}
          className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 mr-3"
        >
          Retake Quiz
        </button>
        <button
          onClick={() => navigate("/dashboard")}
          className="px-6 py-3 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default QuizResults;
