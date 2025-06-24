import {
  createBrowserRouter,
} from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import AllCourse from "../pages/AllCourse";
import CourseDetails from "../components/CourseDetails";


export const router = createBrowserRouter([
  {
    path: "/",
    element:<HomeLayout></HomeLayout>,
    children:[
      {
        path:'/',
        element:<Home></Home>,
      },
      {
        path:'/courses',
        element:<AllCourse></AllCourse>,
      },
      {
        path:'/course/:course_name',
        element:<CourseDetails></CourseDetails>,
      }
    ]
  },
  {
    path:'/auth',
    element:<h1>auth</h1>,
    children:[
      {
        path:'/auth/login',
        element:<Login></Login>,
      },
      {
        path:'/auth/register',
        element:<Register></Register>
      }
    ]
  }
]);