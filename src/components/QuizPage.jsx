
import { useState } from 'react';

const QuizPage = () => {
  const [startQuiz, setStartQuiz] = useState(false);

  return (
    <div className="min-h-screen bg-[#fcf5e5] flex justify-center items-center">
      {!startQuiz ? (
        <div className="max-w-2xl text-center p-10 bg-[#fcf5e5] border-8 border-[#b54343] rounded-xl">
          <h1 className="text-5xl font-bold text-[#b54343] mb-4">Practical<br />Quiz</h1>
          <p className="text-[#b54343] text-lg mb-10">
            I am a great subtitle, ideal for providing more context about the topic you are going to address
          </p>
          <button
            onClick={() => setStartQuiz(true)}
            className="bg-[#b54343] text-white p-4 rounded-full hover:bg-[#a03b3b] text-2xl"
          >
            ➤
          </button>
        </div>
      ) : (
        <div className="text-center text-2xl text-[#b54343] font-semibold">
          Quiz started! (You can now render quiz content here)
        </div>
      )}
    </div>
  );
};

export default QuizPage;
