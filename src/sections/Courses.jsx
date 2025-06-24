import React, { useContext, useEffect, useState } from 'react';
import Course from '../components/Course';
import { authContext } from '../context/AuthProvider';

const Courses = () => {
    const [courses,setCourses]=useState([]);
    const {baseUrl}=useContext(authContext);
    useEffect(()=>{
        fetch(`${baseUrl}/courses`)
        .then(res=>res.json())
        .then(data=>{
            setCourses(data);
        })
    },[])
    return (
        <div>
            <div>
                <h1 className='border-l border-l-[#a75a44]'>Our Courses</h1>
                <p className='text-sm'>Explore Our courses here</p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                courses.slice(0,6).map((course,idx)=><Course key={idx} course={course}></Course>)
            }
            </div>
        </div>
    );
};

export default Courses;