import React, { useState } from "react";
import QuestionPlaceholder from "./QuestionPlaceholder";

const QuizSetup = ({ goBack }) => {
  const [questionCount, setQuestionCount] = useState(1);
  const [questions, setQuestions] = useState([]);

  const generateQuestions = () => {
    const newQuestions = Array.from({ length: questionCount }, (_, index) => ({
      id: Date.now() + index,
      question: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
      order: index + 1,
      marks: 1,
    }));
    setQuestions(newQuestions);
  };

  const updateQuestion = (id, field, value) => {
    setQuestions(
      questions.map((q) => (q.id === id ? { ...q, [field]: value } : q))
    );
  };

  const updateQuestionOption = (questionId, optionIndex, value) => {
    setQuestions(
      questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: q.options.map((opt, idx) =>
                idx === optionIndex ? value : opt
              ),
            }
          : q
      )
    );
  };

  const submitQuiz = () => {
    if (
      questions.some(
        (q) =>
          !q.question.trim() ||
          q.options.some((opt) => !opt.trim())
      )
    ) {
      alert("Please complete all questions!");
      return;
    }
    console.log("Quiz Created:", questions);
    alert("Quiz Created Successfully!");
    goBack();
  };

  return (
    <div className="quiz-setup">
      <style>{`
        .quiz-setup {
          text-align: left;
        }
        .back-btn {
          background: #6b7280;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 8px;
          margin-bottom: 20px;
          cursor: pointer;
        }
        .back-btn:hover {
          background: #4b5563;
        }
        .setup-title {
          font-size: 1.8rem;
          margin-bottom: 25px;
          text-align: center;
        }
        .video-count-section {
          text-align: center;
          margin-bottom: 30px;
        }
        .video-count-input {
          padding: 12px 20px;
          border: 2px solid #e2e8f0;
          border-radius: 10px;
          font-size: 1.1rem;
          width: 150px;
          text-align: center;
        }
        .generate-btn {
          background: linear-gradient(135deg, #B14E0F, #8A2E00);
          color: white;
          border: none;
          padding: 12px 30px;
          border-radius: 10px;
          margin-left: 10px;
          cursor: pointer;
        }
        .add-more-btn {
          background: linear-gradient(135deg, #B14E0F, #8A2E00);
          color: white;
          border: none;
          padding: 15px 30px;
          border-radius: 12px;
          display: block;
          margin: 20px auto;
          cursor: pointer;
          font-weight: 600;
        }
      `}</style>

      <button className="back-btn" onClick={goBack}>← Back to Course Types</button>
      <h2 className="setup-title">Create Practice Test Questions</h2>

      <div className="video-count-section">
        <input
          type="number"
          className="video-count-input"
          min="1"
          max="100"
          value={questionCount}
          onChange={(e) => setQuestionCount(parseInt(e.target.value) || 1)}
        />
        <button className="generate-btn" onClick={generateQuestions}>
          Generate Questions
        </button>
      </div>

      {questions.length > 0 && (
        <>
          {questions.map((q, index) => (
            <QuestionPlaceholder
              key={q.id}
              question={q}
              index={index}
              updateQuestion={updateQuestion}
              updateQuestionOption={updateQuestionOption}
            />
          ))}

          <button className="add-more-btn" onClick={submitQuiz}>
            Create Quiz
          </button>
        </>
      )}
    </div>
  );
};

export default QuizSetup;
