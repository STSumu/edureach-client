import React from 'react';
import { FaUserTie } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Course = ({course}) => {
    const {category,course_name,instructor,duration,price,thumb_url,instructorImg}=course;
    return (
        <Link to={`/course/${course_name}`} className='h-full w-full'>
        <div className="h-full card bg-[#EEBF9F]/10 md:p-6 rounded-2xl shadow-xl overflow-hidden p-4 max-w-sm flex flex-col justify-between">
  <figure className='h-1/2 rounded-xl'>
    <img className='w-full object-cover rounded-xl'
      src={thumb_url}
      alt={course_name} />
  </figure>
  <div >
    <p className='uppercase text-xs mt-4 tracking-widest'>{category}</p>
    <h2 className="text-lg font-semibold mt-1 leading-snug pb-3">
      {course_name}
    </h2>
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