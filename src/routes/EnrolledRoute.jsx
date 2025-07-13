import React, { useEffect } from 'react';
import { useContext } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { authContext } from '../context/AuthProvider';
import Loading from '../components/Loading';
import { EnrollContext } from '../context/EnrollmentProvider';
import Swal from 'sweetalert2';
import CourseContent from '../components/CourseContent';

const EnrolledRoute = ({children}) => {
    const {user,dbUser}=useContext(authContext);
    const {enroll,enLoad}=useContext(EnrollContext);
    const location=useLocation();
    const [redirect, setRedirect] = React.useState(false);
    const navigate=useNavigate();
    const course_id=location.pathname.state.courseId;
    console.log(location.pathname.state.courseId);
  useEffect(() => {
    if (enLoad && !enroll) {
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
          // Navigate to order page
          navigate('/order');
        }
        else if(result.isDenied){
            setRedirect(true);
        }
      });
    }
  }, [enLoad, enroll]);


    if(!enLoad || !dbUser){
        return <Loading></Loading>
    }
    if(enroll){
       return children;
    }
    if(redirect){
        return <CourseContent course_id={course_id}></CourseContent>
    }

   
};

export default EnrolledRoute;