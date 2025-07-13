import { useContext, useEffect, useState } from "react";
import { FaArrowLeft, FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { authContext } from "../context/AuthProvider";
import Rating from "./Rating";
import { MdUpdate } from "react-icons/md";
import { IoIosPhonePortrait } from "react-icons/io";
import { CiTrophy } from "react-icons/ci";
import { GiDuration } from "react-icons/gi";
import Loading from "./Loading";
import CourseContent from "./CourseContent";
import useAddtoList from "../functions/addToList";
import { EnrollContext } from "../context/EnrollmentProvider";
import Material from "../pages/Material";
import useFetch from "../functions/fetch";

const CourseDetails = () => {
  const { baseUrl, dbUser, loading } = useContext(authContext);
  const userId = dbUser?.user_id;
  const params = useParams();
  const [course, setCourse] = useState([]);
  const {enroll}=useContext(EnrollContext);  
  const {handleAddCart,handleAddWishList}=useAddtoList();
  const {fetchCourse}=useFetch();

  ;
 useEffect(() => {
  const loadCourse = async () => {
    const data = await fetchCourse(params?.course_id);
    setCourse(data ? [data] : []); 
  };
  loadCourse();
}, [params?.course_id]);
  

  if (loading || !dbUser || !course || course.length === 0) {
    return <Loading />;
  }

  const { course_name, course_id, category, status, instructor, duration, price, updated_at, thumb_url, description, rating, totalstudent } = course[0];
  


  const date = new Date(updated_at);
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const cartItem = {
      course_id,
      userId,
    }

  
 
  return (
    <div className="mt-15 md:mt-10">
      <div className="p-4 md:p-10 md:px-25 bg-[#471608] text-white flex justify-center flex-col md:mb-20">
        <p>{category}</p>
        <h1 className="text-5xl font-bold">{course_name}</h1>
        <p className="py-6">
          {description}
        </p>
        {/* second section  */}
        <div className="flex gap-2 items-center w-full lg:w-1/3">
          <button className="btn btn-xs border-0 rounded-lg shadow-none bg-[#D8BFAA] font-bold">{status.charAt(0).toUpperCase() + status.slice(1)}</button>
          <p className="inline text-yellow-400 font-bold">{rating ? Number(rating).toFixed(1) : 'N/A'}</p>
          <Rating rating={rating}></Rating>
          <p className="text-sm"> {totalstudent} students</p>
        </div>

        <p className="text-sm py-4 ">Created by <Link className="text-[#f3a574] underline">{instructor}</Link></p>
        <div className="flex items-center">
          <MdUpdate /><p>Last updated {month}/{year}</p>
        </div>

      </div>
      <div className="card bg-base-100 my-4 mx-auto md:my-0 w-full md:w-1/3 lg:w-1/4 shadow-sm md:absolute md:top-50 md:right-30 lg:right-40">
        <figure className="pt-6 md:pt-0">
          <img className="object-cover"
            src={thumb_url}
            alt={course_name} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            ${price}
            <div className="badge badge-secondary bg-[#D8BFAA] text-black border-0">{status}</div>
          </h2>

          <div className="card-actions flex flex-col">
            <button className="btn text-white bg-[#B14E0F] w-full" onClick={()=>{handleAddCart(cartItem)}}><FaShoppingCart />Add to Cart</button>
            <button className="btn text-black border-[#B14E0F] w-full" onClick={()=>handleAddWishList(cartItem)}>Add to WishList</button>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 md:px-10 lg:px-15">
        <h3 className="font-bold text-3xl pb-4">This Course includes:</h3>
        <ul className="*:text-sm space-y-2">
          <li ><GiDuration className="pr-2 inline w-6 h-6" />{duration} long teaching session</li>
          <li ><IoIosPhonePortrait className="inline pr-2 w-6 h-6" />Access on mobile and TV</li>
          <li ><CiTrophy className="inline pr-2 w-6 h-6" />Certificate of completion</li>
        </ul>
      </div>
        <div className="container mx-auto px-4 md:px-10 lg:px-15 mt-10">
          <h3 className="font-bold text-3xl pb-4">Course Content</h3>
          
          <CourseContent course_id={course_id} key={course_id}></CourseContent>
          
        </div>
    </div>
  );
};

export default CourseDetails;
