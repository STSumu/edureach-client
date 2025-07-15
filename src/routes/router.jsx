import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import AuthLayout from "../layouts/AuthLayout";
import Error from "../pages/Error";
import AllCourse from "../pages/AllCourse";
import CourseDetails from "../components/CourseDetails";
import CartItem from "../components/CartItem";
import PrivateRoute from "../routes/PrivateRoute"
import SearchResults from "../pages/SearchResults"; 
import CartPage from "../pages/CartPage";
import WishPage from "../pages/WishPage";
import Dashboard from "../pages/Dashboard";
import EnrolledRoute from "./EnrolledRoute";
import EnrolledCourse from "../pages/EnrolledCourse";
import Material from "../pages/Material";
import OrderPage from "../pages/OrderPage";
import Payment from "../pages/Payment";
import MyCourses from "../pages/MyCourses";


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
        path:'/dashboard',
        element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      },
      {
        path:'/mycourses',
        element:<PrivateRoute><MyCourses></MyCourses></PrivateRoute>
      },
      {
        path:'/content/:courseId/:matId',
        element:<EnrolledRoute><Material></Material></EnrolledRoute>
      },
      {
    path:'/cart',
    element:<PrivateRoute><CartPage></CartPage></PrivateRoute>,
  },
  {
    path:'/order',
    element:<OrderPage></OrderPage>,
  },
      {
    path:'/wish',
    element:<PrivateRoute><WishPage></WishPage></PrivateRoute>,
  },{
    path:'/pay',
    element:<PrivateRoute><Payment></Payment></PrivateRoute>
  },
  { path: "/search", element: <SearchResults /> },
    ],
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
        path:'/auth/register',
        element:<Register></Register>
      }
    ]
  },
   
]);

