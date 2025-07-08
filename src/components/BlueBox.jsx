import React, { useContext, useEffect, useState } from "react";
import CountUp from "react-countup";
import { authContext } from './../context/AuthProvider';

const BlueBox = () => {
  const [users, setUsers] = useState([]);
  const {baseUrl}=useContext(authContext);

  useEffect(() => {
    fetch(`${baseUrl}/user`)
      .then(res => res.json())
      .then(data => {
        setUsers(data);
      })
      .catch(err => console.error("Error fetching users:", err));
  }, []);

  const total = users.length;
  const teachers = users.filter(u => u.role === "teacher").length;
  const students = users.filter(u => u.role === "student").length;
  const {courses}=useContext(authContext);

  return (
    <div className="glass min-h-40 flex gap-4 p-6 md:mb-20 bg-[#A75A44] rounded-xl shadow-lg text-white overflow-x-auto">
      {/* Total Users */}
      <div className="flex-1 text-center">
        <h2 className="text-xl font-semibold mb-2">Total Users</h2>
        <div className="text-3xl font-bold">
          <CountUp end={total} duration={1.5} />
        </div>
      </div>

      {/* Teachers */}
      <div className="flex-1 text-center">
        <h2 className="text-xl font-semibold mb-2">Teachers</h2>
        <div className="text-3xl font-bold">
          <CountUp end={teachers} duration={1.5} />
        </div>
      </div>

      {/* Students */}
      <div className="flex-1 text-center">
        <h2 className="text-xl font-semibold mb-2">Students</h2>
        <div className="text-3xl font-bold">
          <CountUp end={students} duration={1.5} />
        </div>
      </div>

      {/* Admins */}
      <div className="flex-1 text-center">
        <h2 className="text-xl font-semibold mb-2">Courses</h2>
        <div className="text-3xl font-bold">
          <CountUp end={courses.length} duration={1.5} />
        </div>
      </div>
    </div>
  );
};

export default BlueBox;
