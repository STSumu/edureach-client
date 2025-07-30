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
  const [allProfiles, setAllProfiles] = useState([]);
  const auth = getAuth(app);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const googleProvider = new GoogleAuthProvider();

  // Helper function to select user by role priority
  const selectUserByRole = (profiles) => {
    if (!profiles || profiles.length === 0) return null;
    
    const roleHierarchy = ['admin', 'student', 'teacher'];
    
    for (const role of roleHierarchy) {
      const userWithRole = profiles.find(p => p.role === role);
      if (userWithRole) return userWithRole;
    }
    
    return profiles[0]; // fallback to first profile
  };

  // Sign-up/login helpers
  const emailSignup = async (email, password) => {
    setLoading(true);
    try {
      return await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const emaillogin = async (email, password) => {
    setLoading(true);
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const googlelogin = async () => {
    setLoading(true);
    try {
      return await signInWithPopup(auth, googleProvider);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const getTokenHeader = async () => {
    const user = auth.currentUser;
    if (!user) return {};
    try {
      const token = await user.getIdToken();
      return {
        Authorization: `Bearer ${token}`
      };
    } catch (error) {
      console.error('Failed to get token:', error);
      return {};
    }
  };

  // Sync Firebase user to backend
  const syncUser = async (name) => {
    if (!auth.currentUser) return null;
    
    try {
      const token = await auth.currentUser.getIdToken();
      const res = await fetch(`${baseUrl}/user/sync`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ username: name }),
      });

      if (!res.ok) {
        throw new Error(`Sync failed: ${res.status}`);
      }

      const syncResponse = await res.json();
      
      // After successful sync, refresh the user profile
      await refreshUserProfile();
      
      return syncResponse;
    } catch (error) {
      console.error('Error syncing user:', error);
      throw error;
    }
  };

  // Function to refresh user profile from backend
  const refreshUserProfile = async () => {
    if (!auth.currentUser) return;
    
    try {
      const token = await auth.currentUser.getIdToken();
      const res = await fetch(`${baseUrl}/user/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch profile: ${res.status}`);
      }

      const data = await res.json();
      setAllProfiles(data);
      
      const selectedUser = selectUserByRole(data);
      setDbUser(selectedUser);
      
    } catch (err) {
      console.error("Error fetching user from DB:", err);
      setDbUser(null);
      setAllProfiles([]);
    }
  };

  // Fetch all courses (not protected)
  useEffect(() => {
    const controller = new AbortController();
    
    fetch(`${baseUrl}/courses`, { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch((err) => {
        if (err.name !== 'AbortError') {
          console.error('Failed to fetch courses:', err);
        }
      });

    return () => controller.abort();
  }, [baseUrl]);

  // Watch for Firebase user changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        await refreshUserProfile();
      } else {
        setDbUser(null);
        setAllProfiles([]);
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
    allProfiles,
    refreshUserProfile, // Add this for manual refresh if needed
  };

  return (
    <authContext.Provider value={authInfo}>
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;