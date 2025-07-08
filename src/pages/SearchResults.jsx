import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { authContext } from "../context/AuthProvider";
import Course from "../components/Course";

const SearchResults = () => {
  const { courses } = useContext(authContext);
  const [results, setResults] = useState([]);
  const location = useLocation();

  const query = new URLSearchParams(location.search).get("search")?.toLowerCase();

  useEffect(() => {
    if (query) {
      const filtered = courses.filter(
        (c) =>
          c.course_name.toLowerCase().includes(query) ||
          c.instructor.toLowerCase().includes(query)
      );
      setResults(filtered);
    }
  }, [query, courses]);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">Search Results</h2>
      {results.length === 0 ? (
        <p>No results found for "{query}"</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((course) => (
            <Course key={course.course_id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
