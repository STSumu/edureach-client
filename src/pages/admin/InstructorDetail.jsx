import React from 'react';
import { useParams } from 'react-router-dom';

const InstructorDetail = ({ 
  instructor = {
    photo: "https://via.placeholder.com/100",
    name: "John Doe",
    role: "Instructor",
    email: "instructor@email.com",
    phone: "+8801xxxxxxx",
    bio: "Experienced software developer and teacher with 10 years of experience in multiple programming languages.",
    courses: ["Python Basics", "Advanced JavaScript"],
    status: "active" // or "suspended"
  },
  onContact,
  onSuspend,
  onActivate
}) => {
    const {instId}=useParams();
 return (   
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-6">
      
      {/* Header: Photo + Name + Role */}
      <div className="flex items-center space-x-6">
        <img 
          src={instructor.photo} 
          alt={instructor.name} 
          className="w-24 h-24 rounded-full object-cover border-2 border-gray-300" 
        />
        <div>
          <h1 className="text-3xl font-bold">{instructor.name}</h1>
          <p className="text-gray-600 italic">Role: {instructor.role}</p>
        </div>
      </div>

      {/* Contact Info */}
      <div className="space-y-1 text-gray-700">
        <p><strong>Email:</strong> {instructor.email}</p>
        <p><strong>Phone:</strong> {instructor.phone}</p>
      </div>

      {/* Bio */}
      <div>
        <h2 className="font-semibold text-xl mb-2">Bio:</h2>
        <p className="text-gray-700 leading-relaxed">{instructor.bio}</p>
      </div>

      {/* Courses Taught */}
      <div>
        <h2 className="font-semibold text-xl mb-2">Courses Taught:</h2>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          {instructor.courses.length > 0 ? (
            instructor.courses.map((course, idx) => (
              <li key={idx}>{course}</li>
            ))
          ) : (
            <li>No courses listed</li>
          )}
        </ul>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <button 
          onClick={onContact} 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Contact
        </button>
      </div>
    </div>
  );
};

export default InstructorDetail;
