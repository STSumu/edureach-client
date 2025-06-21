import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";

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