import React from 'react';
import { FaUserTie } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Course = ({course}) => {
    const {course_id,category,course_name,rating,instructor,duration,price,thumb_url,instructorImg}=course;
    
    return (
        <Link to={`/courses/${Number(course_id)}`} className='h-full w-full'>
        <div className="h-full card bg-[#EEBF9F]/10 md:p-6 rounded-2xl shadow-xl overflow-hidden p-4 max-w-sm flex flex-col justify-between">
  <figure className='h-1/2 rounded-xl'>
    <img className='w-full object-cover rounded-xl'
      src={thumb_url}
      alt={course_name} />
  </figure>
  <div >
    <p className='uppercase text-xs mt-4 tracking-widest'>{category}</p>
    <div className='flex items-center gap-4 pb-3 justify-between mt-1'>
      <h2 className="text-lg font-semibold leading-snug ">
      {course_name} 
    </h2>
    <p className='text-yellow-500 font-bold'>{rating ? Number(rating).toFixed(1) : 'N/A'}</p>
    </div>
    <div className='flex items-center justify-between border-b border-gray-300'>
        <div className='flex justify-between items-center gap-4 my-3'>
            {instructorImg ? <img src={instructorImg} className='w-8 h-8 rounded-full' alt="" /> : <FaUserTie className='w-8 h-8 rounded-full'></FaUserTie>}
            <p>{instructor}</p>
        </div>
        <div>
            <p>{duration}</p>
        </div>
    </div>
          <div className="flex items-center justify-between mt-4">
        <div>
          <p className="text-lg font-bold">${price}
          </p>
        </div>
        <button className="glass bg-[#A75A44] text-white hover:bg-[#EEBF9F] hover:text-black hover:animate__zoomIn px-5 py-2 rounded-xl transition">
          See Details
        </button>
      </div>
     
  </div>
</div>
        </Link>
    );
};

export default Course;