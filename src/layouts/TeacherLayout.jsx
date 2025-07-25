import React, { useContext } from 'react';
import { Outlet, NavLink, Link } from "react-router-dom";
import {
  FiBookOpen,
  FiUsers,
  FiBarChart2,
  FiTool,
  FiHelpCircle,
} from "react-icons/fi";
import { BsBell } from "react-icons/bs";
import logo from "../assets/logo.png";
import { authContext } from '../context/AuthProvider';
import { FaUserCircle } from 'react-icons/fa';

const TeacherLayout = () => {
  const{dbUser2,user}=useContext(authContext);
    return (
        <div>
             <div className="drawer lg:drawer-open">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content flex flex-col justify-center">
       <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
      Open drawer
    </label>
       <header className="flex items-center justify-end px-6 py-4 bg-white">
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <BsBell size={20} />
            </button>
            <div className="dropdown dropdown-end text-black">
                        <div tabIndex={0} role="button" className="text-2xl text-gray-600 hover:text-black transition duration-200">
                        {
                          dbUser2?.profile_pic ?
                           <img className="w-6 h-6 rounded-full" src={dbUser2.profile_pic}></img> 
                           :
                           <FaUserCircle />
                        }
            
                        </div>
                        <ul
                          tabIndex={0}
                          className="dropdown-content menu bg-base-100 rounded-box z-1 overflow-hidden p-2 shadow-sm"
                        >
                          <li className="border-b-1 border-gray-300">
                            <div className="flex gap-2 items-center">
                              {dbUser2?.profile_pic ? <img className="w-6 h-6 rounded-full" src={dbUser2.profile_pic}></img>
                              :
                              <div className="bg-amber-900 rounded-full w-6 h-6 text-white flex items-center justify-center text-sm">
                                {user?.displayName
                                    ?.split(" ")
                                    .map((word) => word[0].toUpperCase())
                                    .join("") ||
                                  user?.email?.trim()[0].toUpperCase()}
                              </div>
                              }
                              <div>
                                <h5 className="font-semibold">{user.displayName}</h5>
                                <p className="text-xs text-gray-500">{user.email}</p>
                              </div>
                            </div>
                          </li>
                          <li>
                            <Link to='/mycourses'>My Courses</Link>
                          </li>
                          <li>
                           
                            <Link to={`/cart`}>My Cart</Link>
            
                          </li>
                          <li className="border-b-1 border-gray-300">
                            <Link to='/wish'>My WishList</Link>
                          </li>
                          <li>
                            <button>Sign Out</button>
                          </li>
                        </ul>
                      </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8">
          <Outlet />
        </main>
    

  </div>
  <div className="drawer-side">
    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
    <ul className="menu bg-[#EEBF9F]/10 text-base-content min-h-full w-70 p-0">

        <div className="flex flex-col pl-2 md:pl-8 justify-center h-16">
                    <div className="flex items-center gap-2">
                      <img src={logo} alt="Logo" className="w-8 h-8 mt-[16px]" />
                      <Link
                        to="/"
                        className="btn btn-ghost text-2xl font-bold text-black font-serif hover:text-gray-700 transition duration-300 p-0 min-h-0 h-auto"
                      >
                        EduReach
                      </Link>
                    </div>
                    <span className={`text-xs md:text-sm italic pl-4 ml-[28px] mt-[-17px]`}>
                      E-Learning System
                    </span>
        </div>

        {/* Menu */}
        <nav className="flex-1 px-4 py-6 space-y-4 text-sm">
          <NavLink
            to="/teacher/courses"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#EEBF9F] transition ${
                isActive ? "bg-[#EEBF9F] font-semibold" : ""
              }`
            }
          >
            <FiBookOpen size={20} />
            Courses
          </NavLink>

          <NavLink
            to="/teacher/community"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#EEBF9F] transition ${
                isActive ? "bg-[#EEBF9F] font-semibold" : ""
              }`
            }
          >
            <FiUsers size={20} />
            Community
          </NavLink>

          <NavLink
            to="/teacher/performance"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#EEBF9F] transition ${
                isActive ? "bg-[#EEBF9F] font-semibold" : ""
              }`
            }
          >
            <FiBarChart2 size={20} />
            Performance
          </NavLink>

          <NavLink
            to="/teacher/tools"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#EEBF9F] transition ${
                isActive ? "bg-[#EEBF9F] font-semibold" : ""
              }`
            }
          >
            <FiTool size={20} />
            Tools
          </NavLink>

          <NavLink
            to="/teacher/resources"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#EEBF9F] transition ${
                isActive ? "bg-[#EEBF9F] font-semibold" : ""
              }`
            }
          >
            <FiHelpCircle size={20} />
            Resources
          </NavLink>
        </nav>
    </ul>
  </div>
</div>
        </div>
    );
};

export default TeacherLayout;