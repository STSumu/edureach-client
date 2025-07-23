import React, { useContext, useEffect, useState } from 'react';
import { FaUserTie } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';
import Rating from './Rating';
import { EnrollContext } from './../context/EnrollmentProvider';

const Course = ({course}) => {
    const {course_id,category,course_name,rating,instructor,duration,price,thumb_url,instructorImg}=course;
    const [enrolled,setEnrolled]=useState(false);
    const {isEnrolled}=useContext(EnrollContext);
    useEffect(()=>{
        if(isEnrolled(course_id)){
      setEnrolled(true);
    }
    },[])
    return (
        <NavLink to={`${enrolled ? `/enrolled/${course_id}/1`: `/courses/${Number(course_id)}`}`} className='h-full w-full'>
        <div className="card bg-[#EEBF9F]/10 rounded-2xl shadow-xl overflow-hidden p-4 max-w-sm flex flex-col justify-between h-[400px]">
  <figure className='flex-1 rounded-xl'>
    <img className='w-full h-full object-cover rounded-xl'
      src={thumb_url}
      alt={course_name} />
  </figure>
  <div className='flex-1'>
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
        </NavLink>
    );
};

export default Course;