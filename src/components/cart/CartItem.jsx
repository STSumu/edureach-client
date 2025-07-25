import React, { useContext } from "react";
import { FiTrash, FiHeart } from "react-icons/fi";
import { authContext } from "../../context/AuthProvider";
import Loading from "../Loading";
import useAddtoList from "../../functions/addToList";

const CartItem = ({ courseId,handleRemove }) => {
  const {handleAddWishList}=useAddtoList();
  const {courses,dbUser}=useContext(authContext);
  const course=courses.find((course)=> course.course_id=== courseId);
  const userId=dbUser.user_id;
  const wishItem={
    course_id:courseId,
    userId,
  }
  const {course_name,rating,duration,level,price,discount,thumb_url}=course;
  const discountPrice=price-price*discount;
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
            ${discount ? discountPrice : price}
          </p>
          {discount && <p className="text-sm text-gray-400 line-through">
            ${price}
          </p>}
        </div>
        <div className="flex items-center justify-between gap-3 pb-3 *:w-4 *:h-4">
        <button
          onClick={() => handleAddWishList(wishItem)}
        >
          <FiHeart className="w-full"/> 
        </button>
        <button
          onClick={() => handleRemove(courseId)}
        >
          <FiTrash className="w-full text-red-600 hover:text-red-900"/> 
        </button>
        </div>
      </div>
    </div>
  );
};
export default CartItem;
