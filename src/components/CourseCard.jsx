import { Link } from "react-router-dom";

const CourseCard = ({ course }) => {
  return (
    <div className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition duration-200">
      <img
        src={course.thumb_url}
        alt={course.course_name}
        className="w-full h-40 object-cover rounded-lg mb-4"
      />
      <h3 className="text-lg font-semibold mb-1">{course.course_name}</h3>
      <p className="text-sm text-gray-600 mb-1">By {course.instructor}</p>
      <p className="text-yellow-600 font-bold mb-2">{course.rating} ⭐</p>
      <div className="flex justify-between items-center">
        <span className="text-purple-700 font-bold">${course.price}</span>
        <Link to={`/course/${course.course_name}`} className="text-blue-600 underline text-sm">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;
