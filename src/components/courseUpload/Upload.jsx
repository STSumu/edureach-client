import React, { useState } from "react";
import CourseSetup from "./CourseSetup";
import QuizSetup from "./QuizSetup";
import CourseTypeCard from "./CourseTypeCard";

const Upload = () => {
  const [currentPage, setCurrentPage] = useState("selection");
  const [selectedType, setSelectedType] = useState("");

  const goBack = () => {
    setCurrentPage("selection");
    setSelectedType("");
  };

  const handleCourseTypeSelect = (type) => {
    setSelectedType(type);
    setTimeout(() => {
      setCurrentPage(type === "course" ? "videoSetup" : "quizSetup");
    }, 300);
  };

  return (
    <div className="upload-container">
      <style>{`
        .upload-container {
          background: linear-gradient(135deg, #B14E0F, #8A2E00);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          font-family: 'Segoe UI', sans-serif;
        }
        .inner {
          background: white;
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          padding: 40px;
          max-width: 900px;
          width: 100%;
          text-align: center;
        }
        .page-title {
          font-size: 2rem;
          margin-bottom: 30px;
          color: #2c3e50;
        }
        .course-types {
          display: flex;
          gap: 30px;
          justify-content: center;
          flex-wrap: wrap;
        }
      `}</style>

      <div className="inner">
        {currentPage === "selection" && (
          <div>
            <h1 className="page-title">What type of course are you making?</h1>
            <div className="course-types">
              <CourseTypeCard
                type="course"
                icon="📹"
                title="Course"
                description="Create rich learning experiences with videos, quizzes, and exercises."
                selectedType={selectedType}
                onSelect={handleCourseTypeSelect}
              />
              <CourseTypeCard
                type="practice"
                icon="📝"
                title="Practice Test"
                description="Prepare students for certification with quizzes."
                selectedType={selectedType}
                onSelect={handleCourseTypeSelect}
              />
            </div>
          </div>
        )}
        {currentPage === "videoSetup" && <CourseSetup goBack={goBack} />}
        {currentPage === "quizSetup" && <QuizSetup goBack={goBack} />}
      </div>
    </div>
  );
};

export default Upload;
