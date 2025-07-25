import React from 'react';
import { Link } from 'react-router-dom';

const TeacherCourse = () => {
    return (
        <div>
           <div className="bg-white rounded-lg shadow p-6 flex flex-col md:flex-row justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold mb-1">
                Jump Into Course Creation
              </h2>
              <p className="text-gray-600 text-sm">
                Based on your experience, we think these resources will be helpful.
              </p>
            </div>
            <Link to={'/teacher/create'}>
            <button className="mt-4 md:mt-0 px-6 py-2 bg-[#B14E0F] text-white rounded hover:bg-[#b1350f] transition">
              Create Your Course
            </button>
            </Link>
          </div> 
        </div>
    );
};

export default TeacherCourse;