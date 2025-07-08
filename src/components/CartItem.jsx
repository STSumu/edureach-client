import React from "react";
import { FiTrash, FiHeart } from "react-icons/fi";

const CartItem = ({ course, onRemove, onWishlist }) => {
  if (!course) return null;

  return (
    <div className="glass p-4 rounded-xl shadow-md bg-white mb-4 flex flex-col md:flex-row gap-4">
      {/* Course Image */}
      <div className="w-full md:w-40 h-28 flex-shrink-0">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* Course Details */}
      <div className="flex flex-col justify-between flex-1">
        <div>
          <h3 className="text-lg md:text-xl font-semibold text-gray-800">
            {course.title}
          </h3>
          <p className="text-sm text-gray-500">By {course.instructor}</p>

          <div className="flex items-center gap-2 mt-1 text-sm">
            <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded">
              Bestseller
            </span>
            <span className="text-yellow-600 font-bold">{course.rating}</span>
            <span className="text-gray-500">
              ({course.totalRatings} ratings)
            </span>
          </div>

          <p className="text-sm text-gray-600 mt-1">
            {course.duration} hours • {course.lectures} lectures •{" "}
            {course.level}
          </p>
        </div>

        {/* Wishlist / Save Buttons */}
        
      </div>

      {/* Price and Remove button on the right */}
      <div className="flex flex-col items-end justify-between">
        <div className="text-right">
          <p className="text-xl font-bold text-purple-700">
            ${course.discountPrice}
          </p>
          <p className="text-sm text-gray-400 line-through">
            ${course.originalPrice}
          </p>
        </div>
        <div className="flex items-center justify-between gap-3 pb-3 *:w-4 *:h-4">
        <button
          onClick={() => onWishlist(course.course_id)}
        >
          <FiHeart className="w-full"/> 
        </button>
        <button
          onClick={() => onRemove(course.course_id)}
        >
          <FiTrash className="w-full text-red-600 hover:text-red-900"/> 
        </button>
        </div>
      </div>
    </div>
  );
};
export default CartItem;
