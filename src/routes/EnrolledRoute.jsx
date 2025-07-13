import React, { useEffect } from 'react';
import { useContext } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { authContext } from '../context/AuthProvider';
import Loading from '../components/Loading';
import { EnrollContext } from '../context/EnrollmentProvider';
import Swal from 'sweetalert2';
import CourseContent from '../components/CourseContent';
import useAddtoList from '../functions/addToList';

const EnrolledRoute = ({children}) => {
    const {dbUser}=useContext(authContext);
    const {handleAddOrder}=useAddtoList();
    const {enroll,enLoad}=useContext(EnrollContext);
    const location=useLocation();
    const userId=dbUser?.user_id;
    const [redirect, setRedirect] = React.useState(false);
    const courseId=location.state.courseId;
    
  useEffect(() => {
    if (enLoad && dbUser && !enroll.includes(courseId)) {
      Swal.fire({
        title: 'You need to buy this course',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Buy Now',
        cancelButtonText: 'Cancel',
        confirmButtonColor: '#B14E0F',
        background: '#fff7f2',
        customClass: {
          title: 'text-[#B14E0F] font-bold text-2xl',
          popup: 'rounded-xl shadow-xl',
        },
      }).then((result) => {
        if (result.isConfirmed) {
          console.log(courseId);
          handleAddOrder({userId,courseId})
        }
        else if(result.isDismissed){
            setRedirect(true);
        }
      });
    }
  }, [enLoad, dbUser, enroll]);


    
    if (!enLoad || !dbUser || !courseId) {
  return <Loading />;
}
    if(enroll.includes(courseId)){
       return children;
    }
    if(redirect){
        return <Navigate to={`/courses/${courseId}`}></Navigate>
    }
    return null;
   
};

export default EnrolledRoute;