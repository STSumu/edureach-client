import { useContext } from 'react';
import { authContext } from '../context/AuthProvider';


const useFetch = () => {
  const { baseUrl,getTokenHeader} = useContext(authContext);
  

  const fetchCourse = async (courseId) => {
    try {
      const res = await fetch(`${baseUrl}/courses/${courseId}`);
      const data = await res.json();
      return data[0];
    } catch (err) {
      console.error('Fetch course error:', err);
      return null;
    }
  };

  const fetchMaterial = async (courseId) => {
    try {
      const headers = await getTokenHeader();
      const res = await fetch(`${baseUrl}/materials/${courseId}`,{headers});
      const data = await res.json();
      return data;
    } catch (err) {
      console.error('Fetch material error', err);
      return null;
    }
  };

  const fetchMaterialWithAccess = async (matId) => {
    try {
      const headers = await getTokenHeader();
      const res = await fetch(`${baseUrl}/materials/mat/${matId}`, { headers });
      const data = await res.json();
      return data;
    } catch (err) {
      console.error('Fetch material error', err);
      return null;
    }
  };
  const fetchEnrolledCourses = async () => {
    try {
      const headers = await getTokenHeader();
      const res = await fetch(`${baseUrl}/enroll`, { headers });
      if (!res.ok) throw new Error('Failed to fetch enrolled courses');
      const data = await res.json();
      return data.mycourses ?? [];
    } catch (err) {
      console.error('Fetch enrolled courses error:', err);
      return [];
    }
  };

  const fetchTeachingCourses = async () => {
    try {
      const headers = await getTokenHeader();
      const res = await fetch(`${baseUrl}/teach`, { headers });
      if (!res.ok) throw new Error('Failed to fetch teaching courses');
      const data = await res.json();
      return data.mycourses ?? [];
    } catch (err) {
      console.error('Fetch teaching courses error:', err);
      return [];
    }
  };

  const fetchQuiz = async (quizId) => {
    try {
      const headers = await getTokenHeader();
      const res = await fetch(`${baseUrl}/question/${quizId}`, { headers });
      const data = await res.json();
      return data;
    } catch (err) {
      return null;
    }
  };

  const fetchAnswers = async (quizId) => {
    try {
      const headers = await getTokenHeader();
      const res = await fetch(`${baseUrl}/quiz/answer/${quizId}`, { headers });
      const data = await res.json();
      return data;
    } catch (err) {
      return null;
    }
  };

  const fetchAttempt = async (quizId, studentId) => {
    try {
      const headers = await getTokenHeader();
      const res = await fetch(`${baseUrl}/quizattempt/${quizId}?studentId=${studentId}`, { headers });
      const data = await res.json();
      return data;
    } catch (err) {
      return null;
    }
  };

  const fetchProgress = async (studentId, courseId) => {
    try {
      const headers = await getTokenHeader();
      const res = await fetch(`${baseUrl}/progress/${courseId}?studentId=${studentId}`, { headers });
      const data = await res.json();
      return data;
    } catch (err) {
      return null;
    }
  };
  const fetchCart = async () => {
    try {
      const headers = await getTokenHeader();
      const res = await fetch(`${baseUrl}/cart`,{headers}); 
      const data = await res.json();
      return data;
    } catch (err) {
      return null;
    }
  };
  const fetchOrder = async () => {
    try {
      const headers = await getTokenHeader();
      const res = await fetch(`${baseUrl}/order`,{headers}); 
      const data = await res.json();
      return data;
    } catch (err) {
      return null;
    }
  };
  const fetchWish = async () => {
    try {
      const headers = await getTokenHeader();
      const res = await fetch(`${baseUrl}/order`,{headers}); 
      const data = await res.json();
      return data;
    } catch (err) {
      return null;
    }
  };
  const fetchCartTotal = async () => {
    try {
      const headers = await getTokenHeader();
      const res = await fetch(`${baseUrl}/cart/total`, { headers });
      const data = await res.json();
      return data;
    } catch (err) {
      return null;
    }
  };
  const fetchOrderTotal = async () => {
    try {
      const headers = await getTokenHeader();
      const res = await fetch(`${baseUrl}/order/total`, { headers });
      const data = await res.json();
      return data;
    } catch (err) {
      return null;
    }
  };
  

  return {
    fetchCourse,
    fetchMaterial,
    fetchMaterialWithAccess,
    fetchQuiz,
    fetchAnswers,
    fetchAttempt,
    fetchProgress,
    fetchEnrolledCourses,
    fetchTeachingCourses,
    fetchCart,
    fetchCartTotal,
    fetchWish,
    fetchOrder,
    fetchOrderTotal,
  };
};

export default useFetch;
