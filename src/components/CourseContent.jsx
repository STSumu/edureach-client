import { FaBook, FaFilePdf, FaPlay, FaQuestion, FaVideo } from "react-icons/fa";
import { Link } from "react-router-dom";

const CourseContent = ({material}) => {
    const {order,type,title,material_id}=material;
    return (
        <div className="bg-gray-200 border-1 border-gray-400 p-4 md:px-8 flex justify-between items-center">
            <div className="flex gap-4">
                {
                type== 'video' ? <FaVideo></FaVideo> : <FaFilePdf></FaFilePdf>
            }
            <h4>{title}</h4>
            </div>
            <div> {
                type== 'video' ? <Link to={`/content/${material_id}`} className="btn"><FaPlay></FaPlay></Link> : <FaQuestion></FaQuestion>
            }</div>
        </div>
    );
};

export default CourseContent;
