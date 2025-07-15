import { useContext, useEffect, useState } from "react";
import { FaBook, FaFilePdf, FaPlay, FaQuestion, FaVideo } from "react-icons/fa";
import { Link, NavLink, useLocation } from "react-router-dom";
import { authContext } from "../context/AuthProvider";
import Loading from "./Loading";

const CourseContent = ({course_id}) => {
    const [content,setContent]=useState([]);
    const {baseUrl}=useContext(authContext);
    const [loaded,setLoaded]=useState(false);
    const location=useLocation();
    console.log(location);
    useEffect(() => {
    fetch(`${baseUrl}/materials/${course_id}`)
      .then(res => res.json())
      .then(data => {
        setContent(data);
        setLoaded(true);
      });
    
  }, [])
  if(!loaded){
    return <Loading></Loading>
  }
    return (
            <div>
                       {content.length == 0 ?
           <div className="flex items-center"> <h1 className="text-xl font-bold text-gray-500">Upcoming</h1></div>
           : 
           <div className="flex flex-col">
           {
          content.map((material,idx) => 
            <NavLink key={idx}
  to={`/content/${course_id}/${material.material_id}`}
  className={({ isActive }) =>
    `flex justify-between items-center p-4 md:px-8 border border-gray-400 ${
      isActive ? "bg-[#F2EEEC] border-orange-900 font-semibold *:text-[#B14E0F]" : "bg-gray-200"
    }`
  }
>
  <div className="flex gap-4">
    {material.type === "video" ? <FaVideo /> : <FaFilePdf />}
    <h4>{material.title}</h4>
  </div>
  <div>
    {material.type === "video" ? <FaPlay /> : <FaQuestion />}
  </div>
</NavLink>
          )
        }
          </div>
}
            </div>

    );
};

export default CourseContent;
