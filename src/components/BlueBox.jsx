import React, { useEffect, useState } from "react";
import CountUp from "react-countup"; // 👈 import this

const BlueBox = () => {
  const [users, setUsers] = useState([]);
  const baseURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${baseURL}/users`)
      .then(res => res.json())
      .then(data => {
        console.log("Fetched users:", data);
        setUsers(data);
      })
      .catch(err => console.error("Error fetching users:", err));
  }, []);

  const total = users.length;
  const teachers = users.filter(u => u.role === "teacher").length;
  const students = users.filter(u => u.role === "student").length;
  const admins = users.filter(u => u.role === "admin").length;

  return (
    <div className="min-h-40 flex gap-4 p-6 bg-indigo-800 rounded-xl shadow-lg text-white overflow-x-auto">
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
        <h2 className="text-xl font-semibold mb-2">Admins</h2>
        <div className="text-3xl font-bold">
          <CountUp end={admins} duration={1.5} />
        </div>
      </div>
    </div>
  );
};

export default BlueBox;
