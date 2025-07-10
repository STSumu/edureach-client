import React from 'react';
import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { authContext } from '../context/AuthProvider';
import Loading from '../components/Loading';

const EnrolledRoute = ({children}) => {
    const {user,loading,dbUser}=useContext(authContext);
    const location=useLocation();
    if(loading || !dbUser){
        return <Loading></Loading>
    }
    if(user ){
       return children;
    }
    return <Navigate to='/auth/login' state={location}></Navigate>
};

export default EnrolledRoute;