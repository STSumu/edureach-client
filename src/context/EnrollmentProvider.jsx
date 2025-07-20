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
            setEnroll(data.mycourses ?? []);
            setEnLoad(true);
          })
          }
     },[dbUser]);
    const refreshEnrollments = async () => {
  if (!dbUser) return;
  try {
    const res = await fetch(`${baseUrl}/enroll/${dbUser.user_id}`);
    const data = await res.json();
    setEnroll(data.mycourses ?? []);
  } catch (err) {
    console.error("Failed to refresh enrollments", err);
  }
};

    const isEnrolled=(courseId)=>{
        if (!Array.isArray(enroll)) return false;
        if(enroll.includes(Number(courseId))){
            return true;
        }
        else{
            return false;
        }
    }
    const enrollInfo=
    { 
        enroll,
        enLoad,
        isEnrolled,
        refreshEnrollments,
    }
    return (
        <EnrollContext.Provider value={enrollInfo}>
            {children}
        </EnrollContext.Provider>
    );
};

export default EnrollmentProvider;