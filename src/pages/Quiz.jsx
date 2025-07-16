import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { authContext } from '../context/AuthProvider';

const Quiz = () => {
  const { quizId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [error, setError] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [quizResults, setQuizResults] = useState(null);
  const [showAnswers, setShowAnswers] = useState(false);
  const [totalMarks, setTotalMarks] = useState(0);

  const { dbUser, baseUrl } = useContext(authContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const url = baseUrl ? `${baseUrl}/question/${quizId}` : `/quiz/${quizId}`;
        const res = await axios.get(url);
        
        if (res.data && Array.isArray(res.data) && res.data.length > 0) {
          setQuestions(res.data);
          // Get total marks from the first question (assuming all questions have the same total_mark)
          setTotalMarks(res.data[0].total_mark || 0);
        } else {
          setError('No questions found for this quiz');
        }
      } catch (error) {
        console.error('Error fetching quiz:', error);
        setError(error.response?.data?.message || 'Failed to load quiz');
      } finally {
        setLoading(false);
      }
    };

    if (quizId) {
      fetchQuiz();
    }
  }, [quizId, baseUrl]);

  const handleOptionSelect = (quesId, optionId) => {
    if (showAnswers) return; // Prevent selection after showing answers
    
    setSelectedOptions((prev) => ({
      ...prev,
      [quesId]: optionId,
    }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const calculateResults = () => {
    let correctAnswers = 0;
    const marksPerQuestion = totalMarks / questions.length;
    const results = [];

    questions.forEach((question) => {
      const selectedOptionId = selectedOptions[question.ques_id];
      const correctOption = question.options.find(opt => opt.is_correct);
      const selectedOption = question.options.find(opt => opt.option_id === selectedOptionId);
      
      const isCorrect = selectedOptionId === correctOption?.option_id;
      if (isCorrect) correctAnswers++;

      results.push({
        question: question.quiz_text,
        selectedOption: selectedOption?.option_txt || 'No answer selected',
        correctOption: correctOption?.option_txt,
        isCorrect,
        marks: isCorrect ? marksPerQuestion : 0
      });
    });

    const totalScore = correctAnswers * marksPerQuestion;
    const percentage = (correctAnswers / questions.length) * 100;

    return {
      correctAnswers,
      totalQuestions: questions.length,
      totalScore,
      totalMarks,
      percentage,
      marksPerQuestion,
      results
    };
  };

  const handleSubmit = () => {
    const results = calculateResults();
    setQuizResults(results);
    setShowResults(true);
    setShowAnswers(true);
  };

  const handleRetake = () => {
    setSelectedOptions({});
    setCurrentIndex(0);
    setShowResults(false);
    setShowAnswers(false);
    setQuizResults(null);
  };

  const getOptionStyle = (option, questionId) => {
    const baseStyle = {
      display: 'flex',
      alignItems: 'center',
      padding: '12px',
      marginBottom: '8px',
      borderRadius: '8px',
      border: '2px solid #e0e0e0',
      cursor: showAnswers ? 'default' : 'pointer',
      transition: 'all 0.3s ease'
    };

    if (!showAnswers) {
      // Normal state - show selected option
      if (selectedOptions[questionId] === option.option_id) {
        return {
          ...baseStyle,
          backgroundColor: '#e3f2fd',
          borderColor: '#2196f3'
        };
      }
      return {
        ...baseStyle,
        ':hover': {
          backgroundColor: '#f5f5f5'
        }
      };
    }

    // Show answers state
    const isSelected = selectedOptions[questionId] === option.option_id;
    const isCorrect = option.is_correct;

    if (isCorrect) {
      return {
        ...baseStyle,
        backgroundColor: '#e8f5e8',
        borderColor: '#4caf50',
        color: '#2e7d32'
      };
    }

    if (isSelected && !isCorrect) {
      return {
        ...baseStyle,
        backgroundColor: '#ffebee',
        borderColor: '#f44336',
        color: '#c62828'
      };
    }

    return baseStyle;
  };

  const getAnswerIcon = (option, questionId) => {
    if (!showAnswers) return null;

    const isSelected = selectedOptions[questionId] === option.option_id;
    const isCorrect = option.is_correct;

    if (isCorrect) {
      return <span style={{ marginLeft: '8px', color: '#4caf50' }}>✓</span>;
    }

    if (isSelected && !isCorrect) {
      return <span style={{ marginLeft: '8px', color: '#f44336' }}>✗</span>;
    }

    return null;
  };

  if (loading) {
    return (
      <div className="quiz-container mt-20">
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <p>Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="quiz-container mt-20">
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <p style={{ color: '#f44336' }}>Error: {error}</p>
        </div>
      </div>
    );
  }

  if (!questions || questions.length === 0) {
    return (
      <div className="quiz-container mt-20">
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <p>No questions found.</p>
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="quiz-container mt-20">
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Quiz Results</h2>
          
          {/* Score Summary */}
          <div style={{ 
            backgroundColor: '#f8f9fa', 
            padding: '20px', 
            borderRadius: '10px', 
            marginBottom: '30px',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#007bff', marginBottom: '10px' }}>Your Score</h3>
            <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>
              {quizResults.totalScore.toFixed(1)} / {quizResults.totalMarks}
            </div>
            <div style={{ fontSize: '18px', color: '#6c757d' }}>
              {quizResults.correctAnswers} out of {quizResults.totalQuestions} questions correct
            </div>
            <div style={{ fontSize: '16px', color: '#6c757d' }}>
              ({quizResults.percentage.toFixed(1)}%)
            </div>
          </div>

          {/* Performance Badge */}
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <span style={{
              display: 'inline-block',
              padding: '10px 20px',
              borderRadius: '25px',
              fontSize: '16px',
              fontWeight: 'bold',
              backgroundColor: quizResults.percentage >= 80 ? '#28a745' : 
                             quizResults.percentage >= 60 ? '#ffc107' : '#dc3545',
              color: 'white'
            }}>
              {quizResults.percentage >= 80 ? 'Excellent!' : 
               quizResults.percentage >= 60 ? 'Good Job!' : 'Keep Practicing!'}
            </span>
          </div>

          {/* Detailed Results */}
          <h4 style={{ marginBottom: '20px' }}>Question Review</h4>
          {quizResults.results.map((result, index) => (
            <div key={index} style={{
              backgroundColor: 'white',
              border: '1px solid #dee2e6',
              borderRadius: '8px',
              padding: '15px',
              marginBottom: '15px'
            }}>
              <h5 style={{ marginBottom: '10px' }}>
                Question {index + 1}: {result.question}
              </h5>
              <div style={{ marginBottom: '5px' }}>
                <strong>Your Answer: </strong>
                <span style={{ color: result.isCorrect ? '#28a745' : '#dc3545' }}>
                  {result.selectedOption}
                  {result.isCorrect ? ' ✓' : ' ✗'}
                </span>
              </div>
              {!result.isCorrect && (
                <div style={{ marginBottom: '5px' }}>
                  <strong>Correct Answer: </strong>
                  <span style={{ color: '#28a745' }}>{result.correctOption}</span>
                </div>
              )}
              <div>
                <strong>Marks: </strong>
                {result.marks.toFixed(1)} / {quizResults.marksPerQuestion.toFixed(1)}
              </div>
            </div>
          ))}

          {/* Action Buttons */}
          <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <button
              onClick={handleRetake}
              style={{
                padding: '12px 30px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                fontSize: '16px',
                cursor: 'pointer',
                marginRight: '10px'
              }}
            >
              Retake Quiz
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              style={{
                padding: '12px 30px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                fontSize: '16px',
                cursor: 'pointer'
              }}
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const marksPerQuestion = totalMarks / questions.length;

  return (
    <div className="quiz-container mt-20">
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
        
        {/* Header */}
        <div style={{ marginBottom: '30px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <h2>Question {currentIndex + 1} of {questions.length}</h2>
            <div style={{ fontSize: '14px', color: '#6c757d' }}>
              Marks: {marksPerQuestion.toFixed(1)} / {marksPerQuestion.toFixed(1)}
            </div>
          </div>
          
          {/* Progress Bar */}
          <div style={{ width: '100%', height: '6px', backgroundColor: '#e0e0e0', borderRadius: '3px' }}>
            <div 
              style={{ 
                width: `${((currentIndex + 1) / questions.length) * 100}%`, 
                height: '100%', 
                backgroundColor: '#007bff',
                borderRadius: '3px',
                transition: 'width 0.3s ease'
              }}
            />
          </div>
        </div>

        {/* Question */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ 
            fontSize: '20px', 
            lineHeight: '1.5', 
            marginBottom: '25px',
            color: '#333'
          }}>
            {currentQuestion.quiz_text}
          </h3>

          {/* Options */}
          <div>
            {currentQuestion.options && currentQuestion.options.map((option) => (
              <div 
                key={option.option_id}
                style={getOptionStyle(option, currentQuestion.ques_id)}
                onClick={() => handleOptionSelect(currentQuestion.ques_id, option.option_id)}
              >
                <input
                  type="radio"
                  name={`question-${currentQuestion.ques_id}`}
                  value={option.option_id}
                  checked={selectedOptions[currentQuestion.ques_id] === option.option_id}
                  onChange={() => handleOptionSelect(currentQuestion.ques_id, option.option_id)}
                  style={{ marginRight: '12px' }}
                  disabled={showAnswers}
                />
                <span style={{ flex: 1 }}>{option.option_txt}</span>
                {getAnswerIcon(option, currentQuestion.ques_id)}
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button 
            onClick={handlePrev} 
            disabled={currentIndex === 0}
            style={{
              padding: '10px 20px',
              backgroundColor: currentIndex === 0 ? '#ccc' : '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: currentIndex === 0 ? 'not-allowed' : 'pointer'
            }}
          >
            Previous
          </button>

          <div style={{ fontSize: '14px', color: '#6c757d' }}>
            {Object.keys(selectedOptions).length} / {questions.length} answered
          </div>
          
          {currentIndex === questions.length - 1 ? (
            <button 
              onClick={handleSubmit}
              style={{
                padding: '10px 20px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 'bold'
              }}
            >
              Submit Quiz
            </button>
          ) : (
            <button 
              onClick={handleNext}
              style={{
                padding: '10px 20px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;