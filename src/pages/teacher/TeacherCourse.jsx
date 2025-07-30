import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../../functions/fetch';
import { useEffect } from 'react';
import CourseCard from './CourseCard';
import Loading from '../../components/Loading';

const TeacherCourse = () => {
  const [courses,setCourses]=useState();
   const {fetchTeachingCourses}=useFetch();
   const [loading,setLoading]=useState(true);
  useEffect(()=>{
          const fetchData=async()=>{
            const data=await fetchTeachingCourses();
            setCourses(data);
            setLoading(false);
          } 
        fetchData();
    },[])
    if(loading) return <Loading></Loading>
    return (
        <div>
           <div className="bg-white rounded-lg shadow p-6 flex flex-col md:flex-row justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold mb-1">
                Jump Into Course Creation
              </h2>
              <p className="text-gray-600 text-sm">
                Based on your experience, we think these resources will be helpful.
              </p>
            </div>
            <Link to={'/teacher/create'}>
            <button className="mt-4 md:mt-0 px-6 py-2 bg-[#B14E0F] text-white rounded hover:bg-[#b1350f] transition">
              Create Your Course
            </button>
            </Link>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            {
            courses.map((id,idx)=><CourseCard key={idx} course_id={id}></CourseCard>)
          }
            </div> 
        </div>
    );
};

export default TeacherCourse;