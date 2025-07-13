import React, { Children, createContext, useContext, useEffect, useState } from 'react';
import { authContext } from './AuthProvider';

export const EnrollContext=createContext();
const EnrollmentProvider = ({children}) => {
    const [enroll,setEnroll]=useState(false);
    const [enLoad,setEnLoad]=useState(false);
    const {baseUrl,dbUser}=useContext(authContext);

     const getEnroll=async (course_id)=>{
      try {
        const res = await fetch(`${baseUrl}/enroll/${dbUser.user_id}?courseId=${course_id}`);
        const data = await res.json();
        setEnroll(data.enrolled);
        setEnLoad(true);
      }
       catch (err) {
        console.error("Error fetching user from DB:", err);
      }
     
    }
    const enrollInfo=
    {
        getEnroll,
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