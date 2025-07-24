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
  const fetchMaterial=async(courseId,stdId)=>{
    try{
       const result=await fetch(`${baseUrl}/materials/${courseId}?stdId=${stdId}`)
      const data= result.json();
      return data;
    }
    catch(err){
      console.error('Fetch material error',err);
      return null
    }
  };
  const fetchMaterialWithAccess=async(matId,stdId)=>{
    try{
       const result=await fetch(`${baseUrl}/materials/mat/${matId}?stdId=${stdId}`)
      const data= result.json();
      return data;
    }
    catch(err){
      console.error('Fetch material error',err);
      return null
    }
  };
  const fetchQuiz=async(quizId)=>{
    try{
      const result=await fetch(`${baseUrl}/question/${quizId}`)
      const data=result.json();
      return data;
    }
    catch(err){
      return null;
    }
  }
  const fetchAnswers=async(quizId)=>{
    try{
      const result=await fetch(`${baseUrl}/quiz/answer/${quizId}`)
      const data=result.json();
      return data;
    }
    catch(err){
      return null;
    }
  }
  const fetchAttempt=async(quizId,studentId)=>{
    try{
      const result=await fetch(`${baseUrl}/quizattempt/${quizId}?studentId=${studentId}`)
      const data=result.json();
      return data;
    }
    catch(err){
      return null;
    }
  }
  const fetchProgress=async(studentId,courseId)=>{
    try{
      const result=await fetch(`${baseUrl}/progress/${courseId}?studentId=${studentId}`)
      const data=result.json();
      return data;
    }
    catch(err){
      return null;
    }
  }

 return {fetchCourse,fetchMaterial,fetchMaterialWithAccess,fetchQuiz,fetchAnswers,fetchAttempt,fetchProgress};
};

export default useFetch;