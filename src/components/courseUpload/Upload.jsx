import React, { useState } from "react";
import CourseSetup from "./CourseSetup";
import QuizSetup from "./QuizSetup";
import CourseTypeCard from "./CourseTypeCard";
import { useParams } from "react-router-dom";

const Upload = () => {
const param=useParams();

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
<div className="min-h-screen flex items-center justify-center font-sans">
      {currentPage === "selection" && (
        <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-4xl w-full text-center">
          <h1 className="text-2xl font-bold mb-8 text-gray-800">
            What type of course are you making?
          </h1>
          <div className="flex gap-8 justify-center flex-wrap">
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

      {currentPage === "videoSetup" && <CourseSetup courseId={param?.course_id} goBack={goBack} />}
      {currentPage === "quizSetup" && <QuizSetup courseId={param?.course_id} goBack={goBack} />}
    </div>
  );
};

export default Upload;
