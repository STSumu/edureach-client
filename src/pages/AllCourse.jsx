// import { useContext, useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import { authContext } from "../context/AuthProvider";
// import CourseCard from "../components/CourseCard"; // you'll create this

// const AllCourse = () => {
//   const { courses } = useContext(authContext); // All courses from context
//   const [filteredCourses, setFilteredCourses] = useState([]);
//   const location = useLocation();

//   const searchQuery = new URLSearchParams(location.search).get("search")?.toLowerCase();

//   useEffect(() => {
//     if (searchQuery) {
//       const filtered = courses.filter(course =>
//         course.course_name.toLowerCase().includes(searchQuery) ||
//         course.instructor.toLowerCase().includes(searchQuery)
//       );
//       setFilteredCourses(filtered);
//     } else {
//       setFilteredCourses(courses); // no search? show all
//     }
//   }, [searchQuery, courses]);

//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <h2 className="text-3xl font-bold mb-4">All Courses</h2>
//       {filteredCourses.length === 0 ? (
//         <p>No matching courses found.</p>
//       ) : (
//         <div className="grid md:grid-cols-3 gap-6">
//           {filteredCourses.map(course => (
//             <CourseCard key={course.course_id} course={course} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AllCourse;




import React, { useContext } from 'react';
import { authContext } from '../context/AuthProvider';
import Course from '../components/Course';

const AllCourse = () => {
    const {courses}=useContext(authContext);
    return (
        <div className='container mx-auto mt-10 px-4 flex flex-col justify-center items-center py-10'>
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