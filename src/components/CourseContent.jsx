import { useContext, useEffect, useState } from "react";
import { FaBook, FaFilePdf, FaPlay, FaQuestion, FaVideo } from "react-icons/fa";
import { Link } from "react-router-dom";
import { authContext } from "../context/AuthProvider";
import Loading from "./Loading";

const CourseContent = ({course_id}) => {
    const [content,setContent]=useState([]);
    const {baseUrl}=useContext(authContext);
    const [loaded,setLoaded]=useState(false);
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
            <div key={idx} className="bg-gray-200 border-1 border-gray-400 p-4 md:px-8 flex justify-between items-center">
            <div className="flex gap-4">
                {
                material.type== 'video' ? <FaVideo></FaVideo> : <FaFilePdf></FaFilePdf>
            }
            <h4>{material.title}</h4>
            </div>
            <div> {
                material.type== 'video' ? <Link to={`/content/${course_id}/${material.material_id}`} className="btn"><FaPlay></FaPlay></Link> : <FaQuestion></FaQuestion>
            }</div>
        </div>
          )
        }
          </div>
}
            </div>

    );
};

export default CourseContent;
