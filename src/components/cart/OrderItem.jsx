import React from 'react';

const OrderItem = ({ course }) => {
  const {
    course_name,
    instructor,
    duration,
    level,
    price,
    discount,
    thumb_url,
    lectures,
    rating,
    totalRatings
  } = course;

  const discountPrice = discount ? (price - price * discount).toFixed(2) : price;

  return (
    <div className="glass p-4 rounded-xl shadow bg-white mb-4 flex flex-col md:flex-row gap-4">
      {/* Thumbnail */}
      <div className="w-full md:w-40 h-28 flex-shrink-0">
        <img
          src={thumb_url}
          alt={course_name}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* Course Info */}
      <div className="flex flex-col justify-between flex-1">
        <div>
          <h3 className="text-lg md:text-xl font-semibold text-gray-800">
            {course_name}
          </h3>
          <p className="text-sm text-gray-500">By {instructor}</p>
          <div className="flex items-center gap-2 mt-1 text-sm">
            <span className="text-yellow-600 font-bold">
              {rating ? Number(rating).toFixed(1) : 'N/A'}
            </span>
            <span className="text-gray-500">({totalRatings} ratings)</span>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            {duration} hours • {lectures} lectures • {level}
          </p>
        </div>
      </div>

      {/* Price */}
      <div className="flex flex-col items-end justify-between">
        <div className="text-right">
          <p className="text-xl font-bold text-purple-700">${discountPrice}</p>
          {discount && (
            <p className="text-sm text-gray-400 line-through">${price}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
