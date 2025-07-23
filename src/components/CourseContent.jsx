import { useContext, useEffect, useState } from "react";

import { FaBook, FaFilePdf, FaLock, FaLockOpen, FaPlay, FaQuestion, FaVideo } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { authContext } from "../context/AuthProvider";
import Loading from "./Loading";
import { EnrollContext } from "../context/EnrollmentProvider";
import useFetch from "../functions/fetch";


const CourseContent = ({ course_id}) => {
  const [content, setContent] = useState([]);
  const { dbUser,baseUrl } = useContext(authContext);
  const [loaded, setLoaded] = useState(false);
  const {isEnrolled}=useContext(EnrollContext);
  const [completedSet, setCompletedSet] = useState(new Set());
  const {fetchMaterial}=useFetch();

  useEffect(() => {
  const getContent = async () => {
    const materials = await fetchMaterial(course_id, dbUser.user_id);
    const completedIds = materials
  .filter(mat => !mat.islocked)
  .map(mat => mat.material_id);
   setCompletedSet(new Set(completedIds));
    setContent(materials);
    setLoaded(true);
  };

  getContent();
}, [course_id, dbUser.user_id]);








  if (!loaded || !dbUser) {

    return <Loading></Loading>;
  }
  return (
    <div>
      {content.length == 0 ? (
        <div className="flex items-center">
          {" "}
          <h1 className="text-xl font-bold text-gray-500">Upcoming</h1>
        </div>
      ) : (
        <div className="flex flex-col">
          {content.map((material, idx) => (
            <NavLink
              key={idx}
              to={`/enrolled/${course_id}/${material.material_id}`}
              className={({ isActive }) =>
                `flex justify-between items-center p-4 md:px-8 border border-gray-400 ${
                  isActive
                    ? "bg-[#F2EEEC] border-orange-900 font-semibold *:text-[#B14E0F]"
                    : "bg-gray-200"
                }`
              }
            >
              <div className="flex gap-4">
                {material.type === "video" ? <FaVideo /> : <FaFilePdf />}
                <h4>{material.title}</h4>
              </div>
              <div className="flex gap-4">
                {(material?.islocked && !completedSet.has(material.material_id)) ? <FaLock /> : <FaLockOpen />}
                {material.type === "video" ? <FaPlay /> : <FaQuestion />}
              </div>
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseContent;
