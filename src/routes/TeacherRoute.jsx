import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { authContext } from "../context/AuthProvider";
import Loading from "../components/Loading";

const TeacherRoute = ({children}) => {
  const { dbUser2,dbUser,loading} = useContext(authContext);
  if(loading)
    return <Loading></Loading>
  if (!dbUser2 && !dbUser) {
    return <Navigate to="/auth/login" />;
  }

  if (dbUser2.role !== 'teacher') {
    return <Navigate to="/teacher/log" />;
  }

  return children; 
};

export default TeacherRoute;
