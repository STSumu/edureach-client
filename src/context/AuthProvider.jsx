import { createContext, useEffect, useState } from "react";

export const authContext=createContext()
const AuthProvider = ({children}) => {
    const [courses,setCourses]=useState([]);
    useEffect(()=>{
        fetch(`${baseUrl}/courses`)
        .then(res=>res.json())
        .then(data=>{
            setCourses(data);
        })
    },[])
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    const authInfo={
        baseUrl,
        courses,
    }
    return (
        <authContext.Provider value={authInfo}>
            {children}
        </authContext.Provider>
    );
};

export default AuthProvider;