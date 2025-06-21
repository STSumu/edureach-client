import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Navbar from "../components/navbar";
import HomeLayout from "../layouts/HomeLayout";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";

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
    element:<PrivateRoute></PrivateRoute>,
    children:[
      {
        path:'/login',
        element:<Login></Login>,
      },
      {
        path:'/register',
        element:<Register></Register>
      }
    ]
  }
]);