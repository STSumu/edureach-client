
import { createContext } from "react";
import app from "../firebase/firebase.init";
import {getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword, signInWithPopup,createUserWithEmailAndPassword} from "firebase/auth"

export const authContext=createContext();
import { useEffect, useState } from "react";


const AuthProvider = ({children}) => {
    const auth=getAuth(app);

    const [courses,setCourses]=useState([]);
    useEffect(()=>{
        fetch(`${baseUrl}/courses`)
        .then(res=>res.json())
        .then(data=>{
            setCourses(data);
        })
    },[])

    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const googleProvider=new GoogleAuthProvider();

    const emailSignup=(email,password)=>{
        return createUserWithEmailAndPassword(auth,email,password);
    }
    const emaillogin=(email,password)=>{
        return signInWithEmailAndPassword(auth,email,password);
    }
    const googlelogin=()=>{
        return signInWithPopup(auth,googleProvider);
    }
    const authInfo={
        baseUrl,
        googlelogin,
        emailSignup,
        emaillogin,
        courses,

    }
    return (
        <authContext.Provider value={authInfo}>
            {children}
        </authContext.Provider>
    );
};

export default AuthProvider;