import React from "react";

const QuestionPlaceholder = ({ question, index, updateQuestion, updateQuestionOption }) => {
  return (
    <div className="video-placeholder">
      <style>{`
        .video-placeholder {
          background: #fdf8f6;
          border: 2px dashed #f3d4c3;
          border-radius: 12px;
          padding: 25px;
          margin-bottom: 20px;
        }
        .placeholder-header {
          margin-bottom: 15px;
        }
        .placeholder-title {
          font-size: 1.2rem;
          font-weight: 600;
          color: #2d3748;
        }
        .question-inputs {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .input-group {
          display: flex;
          flex-direction: column;
        }
        .input-label {
          font-size: 0.9rem;
          color: #4a5568;
          margin-bottom: 5px;
        }
        .input-field {
          padding: 10px 12px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
        }
        .input-field:focus {
          outline: none;
          border-color: #B14E0F;
        }
        .options-section {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .option-input-group {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .radio-input {
          width: 18px;
          height: 18px;
          accent-color: #B14E0F;
          cursor: pointer;
        }
        .correct-answer-hint {
          font-size: 0.85rem;
          color: #6b7280;
          font-style: italic;
        }
      `}</style>

      <div className="placeholder-header">
        <h3 className="placeholder-title">Question {index + 1}</h3>
      </div>

      <div className="question-inputs">
        {/* Question text */}
        <div className="input-group">
          <label className="input-label">Question</label>
          <textarea
            className="input-field"
            rows="3"
            value={question.question}
            placeholder="Enter question"
            onChange={(e) => updateQuestion(question.id, "question", e.target.value)}
          />
        </div>

        {/* Marks input */}
        <div className="input-group">
          <label className="input-label">Marks</label>
          <input
            type="number"
            className="input-field"
            min="1"
            value={question.marks}
            onChange={(e) => updateQuestion(question.id, "marks", parseInt(e.target.value) || 1)}
          />
        </div>

        {/* Answer options */}
        <div className="options-section">
          <label className="input-label">Answer Options</label>
          {question.options.map((opt, optionIndex) => (
            <div key={optionIndex} className="option-input-group">
              <input
                type="radio"
                name={`correct-${question.id}`}
                className="radio-input"
                checked={question.correctAnswer === optionIndex}
                onChange={() => updateQuestion(question.id, "correctAnswer", optionIndex)}
              />
              <input
                type="text"
                className="input-field"
                value={opt}
                placeholder={`Option ${String.fromCharCode(65 + optionIndex)}`}
                onChange={(e) =>
                  updateQuestionOption(question.id, optionIndex, e.target.value)
                }
              />
            </div>
          ))}
          <p className="correct-answer-hint">
            Select the correct answer using the radio button.
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuestionPlaceholder;
