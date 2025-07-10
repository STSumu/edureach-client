import React from 'react';

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