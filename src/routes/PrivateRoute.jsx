import React, { useContext, useEffect } from 'react';
import { authContext } from '../context/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from "../components/Loading";

const PrivateRoute = ({children}) => {
    const {user,loading,dbUser}=useContext(authContext);
    const location=useLocation();
    
    if(loading){
        return <Loading></Loading>
    }
    if(user){
       return children;
    }
    return <Navigate to='/auth/login' state={{from:location.pathname}}></Navigate>
};

export default PrivateRoute;