import React from "react";
import { FaStar } from "react-icons/fa";
import studentPic from "../assets/student.jpg";

const Chooseus = () => {
  return (
    <div className="flex flex-col md:flex-row p-8 gap-20 bg-gray-100 rounded-lg shadow-md ">
      {/* Left: Image */}
      <div className="flex-shrink-0 w-1/2  ">
        <img 
          src={studentPic}
          alt="Why Choose Us"
          className="w-full h-150  shadow-lg object-cover rounded-4xl"
        />
      </div>

      {/* Right: Rating Section */}
      <div className="flex flex-col justify-start items-start max-w-xl relative">
        {/* Top-left label */}
        <span className="absolute top-0 left-0 bg-white text-indigo-700 border border-indigo-700 px-3 py-1 text-sm font-semibold rounded-md shadow-sm">
          Why Choose Us
        </span>

        {/* Main Heading */}
        <h2 className="text-6xl font-[Lora] mt-12 mb-2 text-gray-800 leading-tight">
          Why <span className="text-[#A75A44] inline">EduReach</span> works for
          you effectively
        </h2>

        {/* Stars */}
        <div className="flex items-center text-yellow-400 text-3xl mb-2"></div>

        {/* Description */}
        <p className="text-gray-700 text-base">
          <ul className="list-none text-gray-700 text-base space-y-3 mt-4">
            <li className="flex items-start gap-2 animate-spin-slow">
              <span className="animate-spin-s       low">🔄</span>
              <span className="text-xln mb   ">
                <strong className="text-[#A75A44]" >Personalized Learning Experience:</strong> EduReach
                adapts to each learner’s pace and style — ensuring everyone
                learns effectively, not just quickly.
              </span >
            </li>
            <li className="flex items-start gap-2">
              <span className="animate-spin-slow ">📚</span>
              <span className="text-xl">
                <strong className="text-[#A75A44]">Centralized Resources:</strong> Access all your course
                materials, assignments, and updates in one place — no more
                digging through messages or emails.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="animate-spin-slow">👩‍🏫</span>
              <span className="text-xl">
                <strong className="text-[#A75A44]">Teacher & Admin Friendly Tools:</strong> Educators can
                manage classes, upload materials, and track progress without
                tech hassles.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="animate-spin-slow">📈</span>
              <span className="text-xl">
                <strong className="text-[#A75A44]">Smart Dashboard & Progress Tracking:</strong> Visual
                dashboards show progress, attendance, and performance — keeping
                both students and teachers on track.
              </span>
            </li>
          </ul>
        </p>
      </div>
    </div>
  );
};

export default Chooseus;
