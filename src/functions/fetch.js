import { useContext } from 'react';
import { authContext } from '../context/AuthProvider';

const useFetch = () => {
   const {baseUrl}=useContext(authContext);

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

 return {fetchCourse};
};

export default useFetch;