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
import SearchResults from "../pages/SearchResults"; // 👈 impo
import CartPage from "../pages/CartPage";
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
        path: "/course/:course_name",
        element: <CourseDetails />,
      },
      {
    path:'/CartPage',
    element:<PrivateRoute><CartPage></CartPage></PrivateRoute>
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

