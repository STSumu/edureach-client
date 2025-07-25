import React, { useState } from 'react';

const CourseRequestPage = () => {
  const [courseData, setCourseData] = useState({
    courseName: '',
    courseDescription: '',
    startDate: '',
    url: ''
  });
  
  // This would typically come from your backend/state management
  const [isApprovedByAdmin, setIsApprovedByAdmin] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    setCourseData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmitRequest = async () => {
    setIsSubmitting(true);
    
    // This would be your actual API call
    try {
      // Simulate API call
      console.log('Course request submitted:', courseData);
      
      // Move to next step
      setCurrentStep(2);
      
      // For demo purposes, let's simulate admin approval after 3 seconds
      setTimeout(() => {
        setIsApprovedByAdmin(true);
      }, 3000);
      
    } catch (error) {
      console.error('Error submitting course request:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddQuiz = () => {
    if (isApprovedByAdmin) {
      console.log('Adding quiz functionality...');
      // Navigate to quiz creation or show quiz form
    }
  };

  const isFormValid = courseData.courseName && courseData.courseDescription && courseData.startDate && courseData.url;

  return (
    <div className="min-h-screen bg-[#EEBF9F]/10 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header with Steps */}
        <div className="mb-8">
          
          
          <h1 className="text-2xl font-bold text-gray-900 text-center">Create New Course</h1>
        </div>

        {currentStep === 1 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="space-y-6">
              {/* Course Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course Name *
                </label>
                <input
                  type="text"
                  value={courseData.courseName}
                  onChange={(e) => handleInputChange('courseName', e.target.value)}
                  placeholder="Enter course name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Course Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course Description *
                </label>
                <textarea
                  value={courseData.courseDescription}
                  onChange={(e) => handleInputChange('courseDescription', e.target.value)}
                  placeholder="Enter course description"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Start Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date *
                </label>
                <input
                  type="date"
                  value={courseData.startDate}
                  onChange={(e) => handleInputChange('startDate', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course URL *
                </label>
                <input
                  type="url"
                  value={courseData.url}
                  onChange={(e) => handleInputChange('url', e.target.value)}
                  placeholder="https://example.com/course"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-4">
                <button
                  onClick={handleSubmitRequest}
                  disabled={!isFormValid || isSubmitting}
                  className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center ${
                    isFormValid && !isSubmitting
                      ? 'bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {isSubmitting && (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  )}
                  {isSubmitting ? 'Submitting...' : 'Submit Course Request'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Curriculum Section */}
        {currentStep === 2 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="py-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Course Request Submitted Successfully!
              </h2>
              <p className="text-gray-600 mb-6">
                Your course request is pending admin approval. Once approved, you'll be able to add quizzes and curriculum.
              </p>
              
              {isApprovedByAdmin && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <p className="text-green-800 font-medium">✓ Course approved by admin!</p>
                  <p className="text-green-600 text-sm">You can now add quizzes and curriculum.</p>
                </div>
              )}

              {/* Module Section */}
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Module 3: Types of Niches in Amazon KDP</h3>
                  <button
                    onClick={() => console.log('Add Module')}
                    disabled={!isApprovedByAdmin}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isApprovedByAdmin
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    + Add Module
                  </button>
                </div>
                
                <div className="text-left">
                  <p className="text-sm text-gray-600 mb-4">Lesson 1-4: Quiz</p>
                  
                  {/* Quiz Section */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium text-gray-900">First Quiz of this module</h4>
                      <button
                        disabled={!isApprovedByAdmin}
                        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                          isApprovedByAdmin
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        + New Question
                      </button>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Question</label>
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 flex items-center justify-between">
                          <span className="text-gray-700">Quiz 1: What is Your First Reaction To the Product?</span>
                          <button className="text-gray-400 hover:text-gray-600">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Option</label>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="flex items-center space-x-2">
                            <input 
                              type="radio" 
                              name="option" 
                              className="text-blue-600 focus:ring-blue-500" 
                              disabled={!isApprovedByAdmin}
                            />
                            <span className={isApprovedByAdmin ? 'text-gray-700' : 'text-gray-400'}>
                              Somewhat Negative
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input 
                              type="radio" 
                              name="option" 
                              className="text-blue-600 focus:ring-blue-500" 
                              disabled={!isApprovedByAdmin}
                            />
                            <span className={isApprovedByAdmin ? 'text-gray-700' : 'text-gray-400'}>
                              Web Designer
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input 
                              type="radio" 
                              name="option" 
                              className="text-blue-600 focus:ring-blue-500" 
                              disabled={!isApprovedByAdmin}
                            />
                            <span className={isApprovedByAdmin ? 'text-gray-700' : 'text-gray-400'}>
                              UI Designer
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input 
                              type="radio" 
                              name="option" 
                              className="text-blue-600 focus:ring-blue-500" 
                              disabled={!isApprovedByAdmin}
                            />
                            <span className={isApprovedByAdmin ? 'text-gray-700' : 'text-gray-400'}>
                              Full Stack Developer
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Right Answer</label>
                          <input
                            type="text"
                            value="Somewhat Negative"
                            disabled={!isApprovedByAdmin}
                            className={`w-full px-3 py-2 border rounded-lg ${
                              isApprovedByAdmin 
                                ? 'border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white' 
                                : 'border-gray-200 bg-gray-50 text-gray-500'
                            }`}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Marks</label>
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-blue-600 text-sm font-medium">?</span>
                            </div>
                            <input
                              type="text"
                              value="02"
                              disabled={!isApprovedByAdmin}
                              className={`flex-1 px-3 py-2 border rounded-lg ${
                                isApprovedByAdmin 
                                  ? 'border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white' 
                                  : 'border-gray-200 bg-gray-50 text-gray-500'
                              }`}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Additional Quiz Items */}
                      <div className="space-y-2">
                        {[
                          'Quiz 2: What is most important to work on KDP?',
                          'Quiz 2: What is most important to work on KDP?',
                          'Quiz 2: What is most important to work on KDP?',
                          'Quiz 2: What is most important to work on KDP?'
                        ].map((quiz, index) => (
                          <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-3 flex items-center justify-between">
                            <span className={`text-sm ${isApprovedByAdmin ? 'text-gray-700' : 'text-gray-400'}`}>
                              {quiz}
                            </span>
                            <button className={`${isApprovedByAdmin ? 'text-gray-400 hover:text-gray-600' : 'text-gray-300'}`}>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Add Quiz Button - This is the main button you requested */}
                  <div className="flex justify-center">
                    <button
                      onClick={handleAddQuiz}
                      disabled={!isApprovedByAdmin}
                      className={`px-6 py-3 rounded-lg text-sm font-medium transition-colors ${
                        isApprovedByAdmin
                          ? 'bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      + Add Quiz
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Status Indicator */}
        {!isApprovedByAdmin && currentStep === 2 && (
          <div className="mt-4 text-center">
            <div className="inline-flex items-center px-4 py-2 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-600 mr-2"></div>
              <span className="text-yellow-800 text-sm">Waiting for admin approval...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseRequestPage;