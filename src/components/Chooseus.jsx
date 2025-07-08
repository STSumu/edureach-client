import React from "react";
import { FaStar } from "react-icons/fa";
import studentPic from "../assets/student.jpg";

const Chooseus = () => {
  const reasons=[
    {
      img:'📚',
      title:'Centralized Resources:',
      text:` Access all your course
                materials, assignments, and updates in one place — no more
                digging through messages or emails.`,
    },
    {
      img:'👩‍🏫',
      title:'Teacher & Admin Friendly Tools:',
      text:`Educators can
                manage classes, upload materials, and track progress without
                tech hassles.`,
    },
    {
      img:'📈',
      title:'Smart Dashboard & Progress Tracking:',
      text:`Visual
                dashboards show progress, attendance, and performance — keeping
                both students and teachers on track.`,
    },
    {
      img:'🔄',
      title:'Personalized Learning Experience:',
      text:` EduReach
                adapts to each learner’s pace and style — ensuring everyone
                learns effectively, not just quickly.`,
    },

  ]
  return (
    <div className="flex flex-col md:flex-row p-2 md:p-8 gap-10 md:gap-20 bg-gray-100 rounded-lg shadow-md ">
      {/* Left: Image */}
      <div className="flex-shrink-0 w-full md:w-1/2 ">
        <img 
          src={studentPic}
          alt="Why Choose Us"
          className="w-full h-150 shadow-lg object-cover rounded-xl"
        />
      </div>

      {/* Right: Rating Section */}
      <div className="flex flex-col justify-start items-start max-w-xl relative">
        {/* Top-left label */}
        <span className="absolute top-0 left-0 bg-white border text-[#A75A44] border-[#A75A44] px-3 py-1 text-sm font-semibold rounded-md shadow-sm">
          Why Choose Us
        </span>

        {/* Main Heading */}
        <h2 className="text-4xl md:text-5xl font-[Lora] mt-12 mb-2 text-gray-800 leading-tight">
          Why <span className="text-[#A75A44] inline">EduReach</span> works for
          you effectively
        </h2>

        {/* Stars */}
        <div className="flex items-center text-yellow-400 text-3xl mb-2"></div>

        {/* Description */}
        <p className="text-gray-700 text-base">
          <ul className="list-none text-gray-700 text-base space-y-3 my-3">
            {
              reasons.map((reason,idx)=>
              <li key={idx} className="flex flex-col items-start gap-2 animate-spin-slow">
              <div>
                <span className="animate-spin-slow">{reason.img}</span>
              <h4 className="inline text-[#A75A44] font-bold text-lg" >{reason.title}</h4>
              </div>
              <span className="text-sm md:text-base text-gray-600 mb">
                {reason.text}
              </span >
            </li>
              )
            }
          </ul>
        </p>
      </div>
    </div>
  );
};

export default Chooseus;
