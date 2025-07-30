import React from "react";

const QuestionPlaceholder = ({ question, index, updateQuestion, updateQuestionOption }) => {
  return (
    <div className="bg-orange-50 border-2 border-dashed border-orange-200 rounded-xl p-6 mb-5">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-800">Question {index + 1}</h3>
      </div>

      {/* Question Textarea */}
      <div className="flex flex-col gap-5">
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">Question</label>
          <textarea
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 resize-none min-h-[90px]"
            value={question.question}
            placeholder="Enter question"
            onChange={(e) => updateQuestion(question.id, "question", e.target.value)}
          />
        </div>

        {/* Marks */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">Marks</label>
          <input
            type="number"
            min="1"
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 w-32"
            value={question.marks}
            onChange={(e) =>
              updateQuestion(question.id, "marks", parseInt(e.target.value) || 1)
            }
          />
        </div>

        {/* Options */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-600 mb-1">Answer Options</label>
          {question.options.map((opt, optionIndex) => (
            <div key={optionIndex} className="flex items-center gap-3">
              <input
                type="radio"
                name={`correct-${question.id}`}
                className="w-5 h-5 text-orange-600 cursor-pointer accent-orange-600"
                checked={question.correctAnswer === optionIndex}
                onChange={() => updateQuestion(question.id, "correctAnswer", optionIndex)}
              />
              <input
                type="text"
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
                value={opt}
                placeholder={`Option ${String.fromCharCode(65 + optionIndex)}`}
                onChange={(e) => updateQuestionOption(question.id, optionIndex, e.target.value)}
              />
            </div>
          ))}
          <p className="text-sm text-gray-500 italic mt-1">
            Select the correct answer using the radio button.
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuestionPlaceholder;
