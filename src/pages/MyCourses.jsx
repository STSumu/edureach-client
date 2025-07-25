import React, { useContext, useEffect, useState } from 'react';
import { EnrollContext } from '../context/EnrollmentProvider';
import useFetch from '../functions/fetch';
import Loading from '../components/Loading';
import { Link } from 'react-router-dom';
import Course from '../components/course/Course';

const MyCourses = () => {
    const {enroll,enLoad}=useContext(EnrollContext);
    const {fetchCourse}=useFetch();
    const [myCourses, setMyCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const loadCourses = async () => {
    if (!enroll || enroll.length === 0) {
      setMyCourses([]);
      setLoading(false);
      return;
    }

    try {
      const fetchedCourses = await Promise.all(
        enroll.map((id) => fetchCourse(id))
      );
      setMyCourses(fetchedCourses);
    } catch (err) {
      console.error("Failed to fetch courses", err);
      setMyCourses([]);
    } finally {
      setLoading(false);
    }
  };

  loadCourses();
}, [enroll]);


  if (loading) 
    return <Loading />;
    return (
        <div className='container mx-auto my-20 px-4 md:px-8 lg:px-30'>
            <h1 className='text-4xl font-bold text-black pb-8'>My Courses</h1>
            {
              myCourses.length==0 ? 
              <div className='flex justify-center items-center py-10'>
                <h1 className='text-4xl text-gray-400'>No Courses to Show</h1>
              </div>
              :
              <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 my-10'>
            {
              myCourses.map((course,idx)=><Course key={idx} course={course}></Course>)
            }
        </div>
              
            }
        <Link to='/courses'><button className='btn bg-[#B14E0F]
            border-0 shadow-lg hidden md:flex text-white text-lg rounded-lg'>Start Exploring</button></Link>
        </div>
    );
};

export default MyCourses;