import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
<<<<<<< HEAD
=======
import Navbar from "../components/navbar";
>>>>>>> 59acfff6cea2c52a0b674931c40ce7836d16f141
import HomeLayout from "../layouts/HomeLayout";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
<<<<<<< HEAD
import Home from "../pages/Home";
=======
>>>>>>> 59acfff6cea2c52a0b674931c40ce7836d16f141

export const router = createBrowserRouter([
  {
    path: "/",
    element:<HomeLayout></HomeLayout>,
    children:[
      {
        path:'/home',
        element:<Home></Home>,
      },
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