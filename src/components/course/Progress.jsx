import React from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { authContext } from '../../context/AuthProvider';
import useFetch from '../../functions/fetch';
import Loading from '../Loading';
import ProgressBar from "@ramonak/react-progress-bar";
import { FaArrowDown } from 'react-icons/fa';

const Progress = ({courseId}) => {
    const [open, setOpen] = useState(false);
    const [progressData,setProgressData]=useState(null);
    const {dbUser}=useContext(authContext);
    const [loading,setLoading]=useState(true);
    const {fetchProgress}=useFetch();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    useEffect(()=>{
        const fetchdata=async()=>{
            const data=await fetchProgress(dbUser.user_id,courseId);
            setProgressData(data);
            setLoading(false);
        }
        fetchdata();
    },[])
    if(loading) return <Loading></Loading>
    
    const {materials_completed,progress,quiz_average,quizzes_attempted,total_materials,total_quizzes}=progressData;
    const materialPercent = total_materials
  ? (materials_completed / total_materials) * 100
  : 0;

const quizPercent = total_quizzes
  ? (quizzes_attempted / total_quizzes) * 100
  : 0;


const round = (num) => Math.round(num * 100) / 100;

    return (
            
   <div className="dropdown dropdown-center">
  <label tabIndex={0} className="btn rounded-full p-0 shadow-none border-0 h-8 w-8 md:rounded-lg  md:w-48 md:px-4 md:py-5 cursor-pointer">
    <div className="radial-progress text-sm text-orange-700"  style={{
      "--value": `${round(progress)}`,
      "--size": "2rem",
      "--thickness": "2px",
    }}
    
  aria-valuenow={progress} role="progressbar">{round(progress)}%</div>
  <span className='hidden md:flex flex-row items-center justify-center'>Your Progress <FaArrowDown></FaArrowDown></span></label>
  <ul
    tabIndex={0}
    className="dropdown-content menu bg-base-100 rounded-box z-50 w-56 p-2 shadow-lg"
  >
    <li>
      <span className="text-xs font-medium">
        Materials Completed ({materials_completed}/{total_materials})
      </span>
      <ProgressBar completed={materialPercent} maxCompleted={100} height={10} labelSize={10}/>
    </li>
    <li>
        <span className="text-xs font-medium">
        Quiz Attempted ({quizzes_attempted}/{total_quizzes})
      </span>
      <ProgressBar completed={quizPercent} maxCompleted={100} height={10} labelSize={10}/>
    </li>
    <li className='flex flex-row justify-between items-center'>
        <span className="text-xs font-medium inline">
        Average Quiz Mark
      </span>
      <span className='font-bold'>{round(quiz_average)}</span>
    </li>
  </ul>
</div>

    
    );
};

export default Progress;