import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Navbar from "../components/navbar";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar></Navbar>
  },
]);