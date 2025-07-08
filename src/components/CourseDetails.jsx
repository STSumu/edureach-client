import { useContext } from "react";
import { FaArrowLeft, FaStar } from "react-icons/fa";
import { Link, useLoaderData, useParams } from "react-router-dom";
import { authContext } from "../context/AuthProvider";
import Rating from "./Rating";

const CourseDetails = () => {
  const params=useParams();
  const course=useContext(authContext).courses.find((course)=>course.course_name===params.course_name);
  console.log(course);
    const {course_name,category,instructor,duration,price,thumb_url,instructorImg,description,rating,totalstudent}=course;
    const handleAddCart=()=>{
        fetch(`${baseUrl}/cart/${course_name}`, {
                  method: "POST",
                  headers: {
                    "content-type": "application/json",
                  },
                  body: JSON.stringify(loadedData),
                })
        .then((res) => res.json())
        .then((data) => {
                    if (data.insertedId) {
                       alert('success')
                    }
                  });
    }
  return (
    <div className="mt-10">
      <div className="p-4 md:p-10 md:px-25 bg-[#471608] text-white flex justify-center flex-col">
          <p>{category}</p>
          <h1 className="text-5xl font-bold">{course_name}</h1>
          <p className="py-6">
        {description}
      </p>
      {/* second section  */}
          <div className="flex gap-2 items-center w-full lg:w-1/3">

            <p className="inline">{rating ? Number(rating).toFixed(1) : 'N/A'}</p>
            <Rating rating={rating}></Rating>
<p>{totalstudent} Students</p>
          </div>
      
      </div>
      <div className="hero bg-base-200 md:min-h-screen w-full">
  <div className="hero-content flex-col lg:flex-row">
    <div className="w-1/2">
      <img
    src={thumb_url}
      className="max-w-sm rounded-lg shadow-2xl"
    />
    </div>
    <div>
      
      <button className="btn" onClick={handleAddCart}>Add to cart</button>
      <button className="btn btn-primary">Add to cart</button>
    </div>
  </div>
</div>
    </div>
  );
};

export default CourseDetails;
