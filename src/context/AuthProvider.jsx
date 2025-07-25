import { createContext } from "react";
import app from "../firebase/firebase.init";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "firebase/auth";
import { useEffect, useState } from "react";


export const authContext = createContext();

const AuthProvider = ({ children }) => {
  const [dbUser, setDbUser] = useState(null);
  const [dbUser2,setDbUser2]=useState(null);
  const auth = getAuth(app);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const googleProvider = new GoogleAuthProvider();

  // Sign-up/login helpers
  const emailSignup = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const emaillogin = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googlelogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };
  const getTokenHeader = async () => {
    const user = auth.currentUser;
    if (!user) return {};
    const token = await user.getIdToken();
    return {
      Authorization: `Bearer ${token}`
    };
  };

  // Sync Firebase user to backend
  const syncUser = async (role,name) => {
    if (!auth.currentUser) return null;
    const token = await auth.currentUser.getIdToken(); // <-- Fetch token here

    const res = await fetch(`${baseUrl}/user/sync`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // <-- Send token
      },
      body: JSON.stringify({ role,username:name }),
    });

    return res.json();
  };

  // Fetch all courses (not protected)
  useEffect(() => {
    fetch(`${baseUrl}/courses`)
      .then((res) => res.json())
      .then((data) => setCourses(data));
  }, [baseUrl]);

  

  // Watch for Firebase user changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        try {
          const token = await currentUser.getIdToken(); // <-- Must fetch token
          const res = await fetch(`${baseUrl}/user/profile`, {
            headers: { Authorization: `Bearer ${token}` }, // <-- Send token
          });

          if (!res.ok) throw new Error(`Failed to fetch profile: ${res.status}`);
          const data = await res.json();
          setDbUser(data);
    
          const res2 = await fetch(`${baseUrl}/teach/profile`, {
            headers: { Authorization: `Bearer ${token}` }, // <-- Send token
          });

          if (!res.ok) throw new Error(`Failed to fetch profile: ${res.status}`);
          const data2 = await res2.json();
          setDbUser2(data2);
        } catch (err) {
          console.error("Error fetching user from DB:", err);
        }
      } else {
        setDbUser(null);
        setDbUser2(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [baseUrl]);

  const authInfo = {
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
    syncUser,
    getTokenHeader,
    dbUser2,
  };

  return (
    <authContext.Provider value={authInfo}>
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
