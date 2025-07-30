

import React, { useEffect, useState } from 'react';
import useFetch from '../../functions/fetch';
import Loading from '../../components/Loading';
import { useNavigate } from 'react-router-dom';

const CourseCard = ({ course_id }) => {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const { fetchCourse } = useFetch();
  const navigate=useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchCourse(course_id);
        setCourse(data);
      } catch (error) {
        console.error('Error fetching course:', error);
      } finally {
        setLoading(false);
      }
    };

    if (course_id) {
      fetchData();
    }
  }, [course_id]);

  if (loading) {
    return <Loading></Loading>
  }
  if (!course) {
    return (
      <div className="card w-96 bg-base-100 shadow-sm">
        <div className="card-body">
          <p className="text-center text-gray-500">Course not found</p>
        </div>
      </div>
    );
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(parseFloat(price));
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'upcoming': { class: 'badge-warning', text: 'Upcoming' },
      'active': { class: 'badge-success', text: 'Active' },
      'completed': { class: 'badge-info', text: 'Completed' },
      'draft': { class: 'badge-neutral', text: 'Draft' }
    };
    
    const config = statusConfig[status] || { class: 'badge-neutral', text: status };
    return <span className={`badge badge-xs ${config.class}`}>{config.text}</span>;
  };

  const renderStarRating = (rating) => {
    const stars = [];
    const numRating = parseFloat(rating) || 0;
    
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`w-4 h-4 ${i <= numRating ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    return stars;
  };
  const handleModify=()=>{
       navigate(`/teacher/modify/${course_id}`) 
  }

  return (
    <div className="card w-96 bg-base-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
      {/* Course Image */}
      {course.thumb_url && (
        <figure className="px-4 pt-4">
          <img
            src={course.thumb_url}
            alt={course.course_name}
            className="rounded-xl h-48 w-full object-cover"
          />
        </figure>
      )}
      
      <div className="card-body">
        {/* Status Badge */}
        <div className="flex justify-between items-start mb-2">
          {getStatusBadge(course.status)}
          {course.discount && parseFloat(course.discount) > 0 && (
            <span className="badge badge-secondary badge-sm">
              {course.discount}% OFF
            </span>
          )}
        </div>

        {/* Course Title and Price */}
        <div className="flex justify-between items-start mb-2">
          <h2 className="card-title text-xl font-bold text-gray-800 line-clamp-2">
            {course.course_name}
          </h2>
          <div className="text-right">
            <span className="text-2xl font-bold text-primary">
              {formatPrice(course.price)}
            </span>
            {course.discount && parseFloat(course.discount) > 0 && (
              <div className="text-sm text-gray-500 line-through">
                {formatPrice((parseFloat(course.price) / (1 - parseFloat(course.discount) / 100)).toFixed(2))}
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        {course.description && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {course.description}
          </p>
        )}

        {/* Course Details */}
        <div className="space-y-2 text-sm mb-4">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-gray-700">Instructor: {course.instructor}</span>
          </div>

          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-gray-700">Level: {course.level || 'All Levels'}</span>
          </div>

          {course.language && (
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
              <span className="text-gray-700">Language: {course.language}</span>
            </div>
          )}

          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="text-gray-700">{course.totalstudent} students enrolled</span>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center">
            {renderStarRating(course.rating)}
          </div>
          <span className="text-sm text-gray-600">
            {course.rating > 0 ? `${parseFloat(course.rating).toFixed(1)}` : 'No ratings yet'}
          </span>
          <span className="text-sm text-gray-500">
            ({course.totalratings} reviews)
          </span>
        </div>

        {/* Action Button */}
        <div className="card-actions justify-end">
          <button className="btn btn-primary btn-block" onClick={()=>handleModify()}>
            Edit Course
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;