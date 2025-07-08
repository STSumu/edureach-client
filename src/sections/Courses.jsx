import React, { useContext} from 'react';
import Course from '../components/Course';
import { authContext } from '../context/AuthProvider';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const Courses = () => {
    const {courses}=useContext(authContext);
    return (
        <div className='py-25 flex flex-col justify-center items-center'>
            <div className='max-w-1/2 justify-center flex flex-col mb-5 md:mb-15'>
                <h1 className='border-l-4 border-l-[#a75a44] pl-2 text-xl md:text-4xl font-bold'>Our Courses</h1>
                <p className='text-sm font-semibold'>Explore Our courses here</p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-15 w-full'>
                {
                courses.slice(0,6).map((course,idx)=><Course key={idx} course={course}></Course>)
            }
            </div>
            <div className='flex justify-end w-full px-4'>
                <Link to='/courses' className='font-bold mt-5 text-2xl text-[#a75a44]'>See more <FaArrowRight className='inline'></FaArrowRight></Link>
            </div>
        </div>
    );
};

export default Courses;