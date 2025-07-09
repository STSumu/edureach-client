import React, { useContext } from 'react';
import { authContext } from '../context/AuthProvider';
import { FaShoppingBasket } from 'react-icons/fa';
import { FiTrash } from 'react-icons/fi';

const WishItem = (courseId,handleRemove,handleAddToCart) => {
      const {courses}=useContext(authContext);
        const course=courses.find((course)=> Number(course.course_id)=== Number(courseId));
        console.log(course);
        const {course_name,rating,duration,level,price,thumb_url}=course;
      return (
        <div className="glass p-4 rounded-xl shadow-md bg-white mb-4 flex flex-col md:flex-row gap-4">
          {/* Course Image */}
          <div className="w-full md:w-40 h-28 flex-shrink-0">
            <img
              src={thumb_url}
              alt={course_name}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
    
          {/* Course Details */}
          <div className="flex flex-col justify-between flex-1">
            <div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-800">
                {course_name}
              </h3>
              <p className="text-sm text-gray-500">By {course.instructor}</p>
    
              <div className="flex items-center gap-2 mt-1 text-sm">
                <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded">
                  Bestseller
                </span>
                <span className="text-yellow-600 font-bold">{rating ? Number(rating).toFixed(1) : 'N/A'}</span>
                <span className="text-gray-500">
                  ({course.totalRatings} ratings)
                </span>
              </div>
    
              <p className="text-sm text-gray-600 mt-1">
                {duration} hours • {course.lectures} lectures •{" "}
                {level}
              </p>
            </div>
    
            {/* Wishlist / Save Buttons */}
            
          </div>
    
          {/* Price and Remove button on the right */}
          <div className="flex flex-col items-end justify-between">
            <div className="text-right">
              
              <p className="text-xl font-bold text-purple-700">
                ${price}
              </p>
             
            </div>
            <div className="flex items-center justify-between gap-3 pb-3 *:w-4 *:h-4">
            <button
              onClick={() => handleAddToCart(course.course_id)}
            >
              <FaShoppingBasket className="w-full"/> 
            </button>
            <button
              onClick={() => handleRemove(course.course_id)}
            >
              <FiTrash className="w-full text-red-600 hover:text-red-900"/> 
            </button>
            </div>
          </div>
        </div>
)};

export default WishItem;