import React, { Children, createContext, useContext, useEffect, useState } from 'react';
import { authContext } from './AuthProvider';

export const EnrollContext=createContext();
const EnrollmentProvider = ({children}) => {
    const [enroll,setEnroll]=useState([]);
    const [enLoad,setEnLoad]=useState(false);
    const {baseUrl,dbUser}=useContext(authContext);

     useEffect(()=>{
          if(dbUser){
            fetch(`${baseUrl}/enroll/${dbUser.user_id}`)
          .then(res=>res.json())
          .then(data=>{
            setEnroll(data.mycourses);
            setEnLoad(true);
          })
          }
     },[dbUser])
    
    const enrollInfo=
    { 
        enroll,
        enLoad,
    }
    return (
        <EnrollContext.Provider value={enrollInfo}>
            {children}
        </EnrollContext.Provider>
    );
};

export default EnrollmentProvider;