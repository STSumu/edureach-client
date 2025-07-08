import React, { useContext } from 'react';
import { authContext } from '../context/AuthProvider';
import { Navigate, useNavigate } from 'react-router-dom';
import Loading from "../components/Loading";

const PrivateRoute = ({children}) => {
    const {user,loading}=useContext(authContext);
    if(loading){
        return <Loading></Loading>
    }
    if(user){
       return children;
    }
    return <Navigate to='/auth/login'></Navigate>
};

export default PrivateRoute;