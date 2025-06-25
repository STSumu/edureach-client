import { createContext } from "react";
import app from "../firebase/firebase.init";
import {getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword, signInWithPopup,createUserWithEmailAndPassword} from "firebase/auth"

export const authContext=createContext();

const AuthProvider = ({children}) => {
    const auth=getAuth(app);
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
    }
    return (
        <authContext.Provider value={authInfo}>
            {children}
        </authContext.Provider>
    );
};

export default AuthProvider;