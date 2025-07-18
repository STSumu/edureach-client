import React, { useContext, useEffect, useState } from 'react';
import { EnrollContext } from '../context/EnrollmentProvider';
import useFetch from '../functions/fetch';
import CourseDetails from '../components/CourseDetails';
import Course from '../components/Course';
import Loading from '../components/Loading';

const MyCourses = () => {
    const {enroll,enLoad}=useContext(EnrollContext);
    const {fetchCourse}=useFetch();
    const [myCourses, setMyCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCourses = async () => {
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

    if (enLoad) {
      loadCourses();
    } else {
      setLoading(false);
    }
  }, [enroll]);

  if (loading) 
    return <Loading />;
    return (
        <div className='container mx-auto my-30 px-4 md:px-8 lg:px-30'>
            <h1 className='text-4xl font-bold text-black pb-10'>My Courses</h1>
            <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
            {
                myCourses.map((course,idx)=><Course key={idx} course={course}></Course>)
            }
        </div>
        </div>
    );
};

export default MyCourses;