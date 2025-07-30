import React, { useContext } from 'react';
import { authContext } from '../context/AuthProvider';
import Loading from '../components/Loading';

const AdminRoute = ({children}) => {
  const { loading, dbUser, allProfiles } = useContext(authContext);
  if (loading) return <Loading />;
  const isAdmin = allProfiles?.some(p => p.role === "admin");
  if (!dbUser) return <Navigate to="/auth/login" />;
  if (!isAdmin) return <Navigate to="/" />;

  return children;
};

export default AdminRoute;