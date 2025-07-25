import React, { createContext, useContext, useEffect, useState } from 'react';
import { authContext } from './AuthProvider';

export const EnrollContext = createContext();

const EnrollmentProvider = ({ children }) => {
  const [enroll, setEnroll] = useState([]);
  const [enLoad, setEnLoad] = useState(false);
  const [refreshProgress,setRefreshProgress]=useState(false);
  const { baseUrl, dbUser, getTokenHeader } = useContext(authContext);
  const triggerProgressRefresh = () => {
  setRefreshProgress(prev => !prev);  // toggle between true/false
};
  // Fetch enrollments on mount or when user changes
  useEffect(() => {
    const fetchEnrollments = async () => {
      if (!dbUser) return;
      try {
        const headers = await getTokenHeader();
        const res = await fetch(`${baseUrl}/enroll`, { headers });
        const data = await res.json();
        setEnroll(data.mycourses ?? []);
        setEnLoad(true);
      } catch (err) {
        console.error('Failed to load enrollments:', err);
      }
    };

    fetchEnrollments();
  }, [dbUser, baseUrl, getTokenHeader]);

  // Function to refresh enrollments after changes
  const refreshEnrollments = async () => {
    if (!dbUser) return;
    try {
      const headers = await getTokenHeader();
      const res = await fetch(`${baseUrl}/enroll`, { headers });
      const data = await res.json();
      setEnroll(data.mycourses ?? []);
    } catch (err) {
      console.error('Failed to refresh enrollments:', err);
    }
  };

  const isEnrolled = (courseId) => {
    if (!Array.isArray(enroll)) return false;
    return enroll.includes(Number(courseId));
  };

  const enrollInfo = {
    enroll,
    enLoad,
    isEnrolled,
    refreshEnrollments,
    refreshProgress,
    triggerProgressRefresh,
  };

  return (
    <EnrollContext.Provider value={enrollInfo}>
      {children}
    </EnrollContext.Provider>
  );
};

export default EnrollmentProvider;
