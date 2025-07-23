import React from "react";

const QuizNavigation = ({
  currentIndex,
  totalQuestions,
  handlePrev,
  handleNext,
  handleSubmit,
  selectedCount,
}) => {
  return (
    <div className="flex justify-between items-center">
      <button
        onClick={handlePrev}
        disabled={currentIndex === 0}
        className={`px-4 py-2 rounded text-white ${
          currentIndex === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-gray-600 hover:bg-gray-700"
        }`}
      >
        Previous
      </button>

      <p className="text-gray-600 text-sm">
        {selectedCount} / {totalQuestions} answered
      </p>

      {currentIndex === totalQuestions - 1 ? (
        <button
          onClick={handleSubmit}
          className="px-4 py-2 rounded text-white bg-green-600 hover:bg-green-700 font-semibold"
        >
          Submit Quiz
        </button>
      ) : (
        <button
          onClick={handleNext}
          className="px-4 py-2 rounded text-white bg-blue-600 hover:bg-blue-700"
        >
          Next
        </button>
      )}
    </div>
  );
};

export default QuizNavigation;
