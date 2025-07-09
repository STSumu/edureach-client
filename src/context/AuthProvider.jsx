
import { createContext } from "react";
import app from "../firebase/firebase.init";
import {getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword, signInWithPopup,createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut} from "firebase/auth"

export const authContext=createContext();
import {useEffect, useState } from "react";



const AuthProvider = ({children}) => {
    const [dbUser, setDbUser] = useState(null);
    const auth=getAuth(app);
    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(true);
    const [courses,setCourses]=useState([]);

    useEffect(()=>{
        fetch(`${baseUrl}/courses`)
        .then(res=>res.json())
        .then(data=>{
            setCourses(data);
            setLoading(false);
        })
    },[])

    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const googleProvider=new GoogleAuthProvider();

    const emailSignup=(email,password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password);
    }
    const emaillogin=(email,password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password);
    }
    const googlelogin=()=>{
        setLoading(true);
        return signInWithPopup(auth,googleProvider);
    }
    const logOut=()=>{
        setLoading(true);
        return signOut(auth);
    }
    const authInfo={
        baseUrl,
        googlelogin,
        emailSignup,
        emaillogin,
        courses,
        user,
        setUser,
        loading,
        logOut,
        dbUser,
        setDbUser,
    }
    useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
    setUser(currentUser);
    setLoading(false);

    if (currentUser?.email) {
      try {
        const res = await fetch(`${baseUrl}/user/${currentUser.email}`);
        const data = await res.json();
        setDbUser(data);
      } catch (err) {
        console.error("Error fetching user from DB:", err);
      }
    } else {
      setDbUser(null);
    }
  });

  return () => unsubscribe();
}, [baseUrl]);

    return (
        <authContext.Provider value={authInfo}>
            {children}
        </authContext.Provider>
    );
};

export default AuthProvider;