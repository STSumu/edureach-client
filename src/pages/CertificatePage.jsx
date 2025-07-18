import React from "react";

const CertificatePage = () => {
  // Dummy data
  const studentName = "John Doe";
  const courseName = "Full Stack Web Development";
  const date = "July 16, 2025";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-blue-50 p-6">
      <div className="w-full max-w-4xl bg-white shadow-2xl rounded-2xl border-8 border-yellow-400 p-10 text-center relative">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">
          Certificate of Completion
        </h1>
        <p className="text-xl mb-6 text-gray-600 italic">
          This is to certify that
        </p>

        <h2 className="text-3xl font-semibold text-blue-600 mb-4">
          {studentName}
        </h2>

        <p className="text-xl text-gray-700 mb-2">
          has successfully completed the course
        </p>
        <p className="text-2xl font-medium text-purple-600 mb-6">
          "{courseName}"
        </p>

        <div className="mt-8 flex justify-between items-center px-10 text-gray-600">
          <div>
            <p className="border-t border-gray-400 pt-2">Instructor</p>
          </div>
          <div>
            <p className="border-t border-gray-400 pt-2">Date: {date}</p>
          </div>
        </div>

        <div className="absolute bottom-4 right-4 text-sm text-gray-400">
          Powered by EduReach
        </div>
      </div>
    </div>
  );
};

export default CertificatePage;
