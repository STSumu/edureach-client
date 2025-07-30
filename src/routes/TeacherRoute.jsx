import { Navigate, Outlet } from "react-router-dom";
import { useContext, useEffect } from "react";
import { authContext } from "../context/AuthProvider";
import Loading from "../components/Loading";

const TeacherRoute = ({ children }) => {
  const { loading, dbUser, allProfiles } = useContext(authContext);

  if (loading) return <Loading />;
  const isTeacher = allProfiles?.some(p => p.role === "teacher");
  if (!dbUser) return <Navigate to="/auth/login" />;
  if (!isTeacher) return <Navigate to="/teacherlog" />;

  return children;
};

export default TeacherRoute;
