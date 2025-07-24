import React from "react";

const QuestionCard = ({ question, selectedOptions, handleOptionSelect }) => {
  const getOptionClasses = (option) => {
    const selected = selectedOptions.find(sel => sel.ques_id === question.ques_id);
    const isSelected = selected?.option_id === option.option_id;

    return `flex items-center p-3 mb-2 rounded border-2 cursor-pointer 
      transition hover:bg-gray-100 ${
        isSelected ? "bg-blue-100 border-blue-400" : "border-gray-300"
      }`;
  };

  return (
    <div className="mb-8">
      <h3 className="text-lg font-medium text-gray-800 mb-6">{question.quiz_text}</h3>
      {question.options.map((option) => {
        const selected = selectedOptions.find(sel => sel.ques_id === question.ques_id);
        const isChecked = selected?.option_id === option.option_id;

        return (
          <div
            key={option.option_id}
            className={getOptionClasses(option)}
            onClick={() => handleOptionSelect(question.ques_id, option.option_id)}
          >
            <input
              type="radio"
              name={`question-${question.ques_id}`}
              value={option.option_id}
              checked={isChecked}
              onChange={() => handleOptionSelect(question.ques_id, option.option_id)}
              className="mr-3"
            />
            <span className="flex-1">{option.option_txt}</span>
          </div>
        );
      })}
    </div>
  );
};

export default QuestionCard;
