import React, { useState, useContext } from "react";
import QuestionPlaceholder from "./QuestionPlaceholder";
import { authContext } from "../../context/AuthProvider";
import Swal from "sweetalert2";

const QuizSetup = ({ courseId,goBack }) => {
  const [quizTitle, setQuizTitle] = useState("");
  const [questionCount, setQuestionCount] = useState(1);
  const [questions, setQuestions] = useState([]);
  const { baseUrl, getTokenHeader } = useContext(authContext);

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

  const submitQuiz = async () => {
    if (!quizTitle.trim()) {
      alert("Please enter a quiz title.");
      return;
    }

    if (
      questions.some(
        (q) => !q.question.trim() || q.options.some((opt) => !opt.trim())
      )
    ) {
      alert("Please complete all questions!");
      return;
    }

    const headers = await getTokenHeader();
    const material = {
      courseId,
      quizTitle,
      questions,
    };

    try {
      const res = await fetch(`${baseUrl}/teach/quiz`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        body: JSON.stringify(material),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Upload failed");
      }
      Swal.fire({
        title: "Success",
        icon: "success",
        text: `Quiz created successfully.`,
        draggable: true,
      });
      goBack();
    } catch (err) {
      console.error("Upload failed:", err);
      alert(err.message);
    }
  };

  return (
    <div className="text-left p-6 w-full mx-auto">
      <button
        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md mb-5"
        onClick={goBack}
      >
        ← Back to Course Types
      </button>

      <h2 className="text-3xl font-semibold text-center mb-6">
        Create Practice Test Questions
      </h2>

      <div className="mb-8 max-w-xl mx-auto">
        <label className="block mb-2 text-lg font-medium">Quiz Title</label>
        <input
          type="text"
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-lg"
          placeholder="Enter quiz title"
          value={quizTitle}
          onChange={(e) => setQuizTitle(e.target.value)}
        />
      </div>

      <div className="text-center mb-8">
        <input
          type="number"
          className="px-4 py-3 border-2 border-gray-300 rounded-lg text-lg w-32 text-center"
          min="1"
          max="100"
          value={questionCount}
          onChange={(e) => setQuestionCount(parseInt(e.target.value) || 1)}
        />
        <button
          className="ml-4 bg-gradient-to-r from-orange-700 to-orange-900 text-white px-6 py-3 rounded-lg"
          onClick={generateQuestions}
        >
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

          <button
            className="bg-gradient-to-r from-orange-700 to-orange-900 text-white px-8 py-4 rounded-xl font-semibold block mx-auto mt-6"
            onClick={submitQuiz}
          >
            Create Quiz
          </button>
        </>
      )}
    </div>
  );
};

export default QuizSetup;
