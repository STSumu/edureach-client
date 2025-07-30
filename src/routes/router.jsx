import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import AuthLayout from "../layouts/AuthLayout";
import Error from "../pages/Error";
import AllCourse from "../pages/AllCourse";
import PrivateRoute from "../routes/PrivateRoute";
import SearchResults from "../pages/SearchResults";
import CartPage from "../pages/CartPage";
import WishPage from "../pages/WishPage";
import Dashboard from "../pages/Dashboard";
import EnrolledRoute from "./EnrolledRoute";
import EnrolledCourse from "../pages/EnrolledCourse";
import OrderPage from "../pages/OrderPage";
import Payment from "../pages/Payment";
import MyCourses from "../pages/MyCourses";
import CertificatePage from "../pages/CertificatePage";
import EnrollLayout from "../layouts/EnrollLayout";
import CourseRequestPage from "../components/CourseRequestPage";
import QuizPage from "../components/quiz/QuizPage";
import QuizResults from "../components/quiz/QuizResults";
import CourseDetails from "../components/course/CourseDetails";
import TeacherRoute from "./TeacherRoute";
import Student from "../pages/student/Student";
import TeacherLayout from "../layouts/TeacherLayout";
import BeTeacher from "../pages/teacher/BeTeacher";
import TeacherCourse from "../pages/teacher/teacherCourse";
import EditProfile from "../components/EditProfile";
import AdminLayout from "../layouts/AdminLayout";
import Requests from "../pages/admin/Requests";
import CourseDetail from "../pages/admin/CourseDetail";
import InstructorDetail from "../pages/admin/InstructorDetail";
import Upload from "../components/courseUpload/Upload";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/courses",
        element: <AllCourse></AllCourse>,
      },
      {
        path: "/courses/:course_id",
        element: <CourseDetails />,
      },

      {
        path: "/mylearning",
        element: (
          <PrivateRoute>
            <Student></Student>
          </PrivateRoute>
        ),
      },
      {
        path: "/mycourses",
        element: (
          <PrivateRoute>
            <MyCourses></MyCourses>
          </PrivateRoute>
        ),
      },

      {
        path: "/cart",
        element: (
          <PrivateRoute>
            <CartPage></CartPage>
          </PrivateRoute>
        ),
      },
      {
        path: "/order",
        element: (
          <PrivateRoute>
            <OrderPage></OrderPage>
          </PrivateRoute>
        ),
      },
      {
        path: "/wish",
        element: (
          <PrivateRoute>
            <WishPage></WishPage>
          </PrivateRoute>
        ),
      },
      {
        path: "/pay",
        element: (
          <PrivateRoute>
            <Payment></Payment>
          </PrivateRoute>
        ),
      },
      { path: "/search", element: <SearchResults /> },

      {
        path: "/complete/:courseId",
        element: (
          <PrivateRoute>
            <CertificatePage></CertificatePage>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/course_request",
    element: <CourseRequestPage></CourseRequestPage>,
  },
  {
    path: "/edit",
    element: <EditProfile></EditProfile>,
  },

  {
    path: "/enrolled/",
    element: (
      <EnrolledRoute>
        <EnrollLayout></EnrollLayout>
      </EnrolledRoute>
    ),
    children: [
      {
        path: ":courseId/:matId",
        element: <EnrolledCourse></EnrolledCourse>,
      },
      {
        path: "quiz/:quizId",
        element: <QuizPage></QuizPage>,
      },
      {
        path: "quiz/result/:quizId",
        element: <QuizResults></QuizResults>,
      },
      {
        path: "certificate/:courseId",
        element: <CertificatePage></CertificatePage>,
      },
    ],
  },
  {
    path: "/teacherlog",
    element: <BeTeacher></BeTeacher>,
  },
  {
    path: "/teacher",
    element: (
      <PrivateRoute>
        <TeacherRoute>
          <TeacherLayout></TeacherLayout>
        </TeacherRoute>
      </PrivateRoute>
    ),
    children: [
      {
        path: "",
        element: <TeacherCourse></TeacherCourse>,
      },
      {
        path: "create",
        element: <CourseRequestPage></CourseRequestPage>,
      },
      {
        path:'modify/:course_id',
        element:<Upload></Upload>
      }
    ],
  },
  {
    path: "/admin",
    element: (
      <PrivateRoute>
        <AdminLayout></AdminLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "requests",
        element: <Requests></Requests>,
      },
      {
        path:':reqId',
        element:<CourseDetail></CourseDetail>
      },
      {
        path:'instructor/:instId',
        element:<InstructorDetail></InstructorDetail>
      },
      {
        path:'instructor/teachers',
        element:<InstructorDetail></InstructorDetail>
      }
    ]

  },
  {
    path: "/auth",
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: "/auth/login",
        element: <Login></Login>,
      },
      {
        path: "/auth/register",
        element: <Register></Register>,
      },
    ],
  },
]);
