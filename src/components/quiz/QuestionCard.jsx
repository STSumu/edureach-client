import React from "react";

const QuestionCard = ({ question, selectedOptions, handleOptionSelect, showAnswers }) => {
  const getOptionClasses = (option) => {
    const isSelected = selectedOptions[question.ques_id] === option.option_id;
    const isCorrect = option.is_correct;

    if (!showAnswers) {
      return `flex items-center p-3 mb-2 rounded border-2 cursor-pointer 
        transition hover:bg-gray-100 ${
          isSelected ? "bg-blue-100 border-blue-400" : "border-gray-300"
        }`;
    }

    // When showing answers
    if (isCorrect) return "flex items-center p-3 mb-2 rounded border-2 bg-green-100 border-green-400 text-green-700";
    if (isSelected && !isCorrect)
      return "flex items-center p-3 mb-2 rounded border-2 bg-red-100 border-red-400 text-red-700";
    return "flex items-center p-3 mb-2 rounded border-2 border-gray-300";
  };

  return (
    <div className="mb-8">
      <h3 className="text-lg font-medium text-gray-800 mb-6">{question.quiz_text}</h3>
      {question.options.map((option) => (
        <div
          key={option.option_id}
          className={getOptionClasses(option)}
          onClick={() => !showAnswers && handleOptionSelect(question.ques_id, option.option_id)}
        >
          <input
            type="radio"
            name={`question-${question.ques_id}`}
            value={option.option_id}
            checked={selectedOptions[question.ques_id] === option.option_id}
            onChange={() => handleOptionSelect(question.ques_id, option.option_id)}
            disabled={showAnswers}
            className="mr-3"
          />
          <span className="flex-1">{option.option_txt}</span>
          {showAnswers && option.is_correct && <span className="ml-2 text-green-600">✓</span>}
          {showAnswers && !option.is_correct && selectedOptions[question.ques_id] === option.option_id && (
            <span className="ml-2 text-red-600">✗</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default QuestionCard;
