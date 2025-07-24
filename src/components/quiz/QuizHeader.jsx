import React from "react";

const QuizHeader = ({ currentIndex, totalQuestions, marksPerQuestion }) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold">
          Question {currentIndex + 1} of {totalQuestions}
        </h2>
        <p className="text-gray-600 text-sm">
          Marks: {marksPerQuestion.toFixed(1)} / {marksPerQuestion.toFixed(1)}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-gray-200 rounded">
        <div
          className="h-2 bg-[#B14E0F] rounded transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default QuizHeader;
