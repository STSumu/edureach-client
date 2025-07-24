import React, { useContext } from 'react';
import { authContext } from '../context/AuthProvider';
import Course from '../components/course/Course';


const AllCourse = () => {
    const {courses}=useContext(authContext);
    return (
        <div className='container mx-auto mt-10 px-4 md:px-8 lg:px-20 flex flex-col justify-center items-center py-10'>
            <div className='max-w-1/2 justify-center flex flex-col'>
                <h1 className='border-l-4 border-l-[#a75a44] pl-2 text-xl md:text-4xl font-bold'>Our Courses</h1>
                <p className='text-sm font-semibold'>Explore Our courses here</p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-10'>
                {
                courses.map((course,idx)=><Course key={idx} course={course}></Course>)
            }
            </div>
        </div>
    );
};

export default AllCourse;