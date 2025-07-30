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
import SideNav from '../components/navigation/SideNav';

const AdminLayout = () => {
  const{dbUser,user}=useContext(authContext);
    return (
        <div>
             <div className="drawer lg:drawer-open">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content flex flex-col justify-center">
       <header>
        <SideNav></SideNav>
       </header>

        {/* Page Content */}
        <main className="flex-1 p-8">
          <Outlet />
        </main>
    

  </div>
  <div className="drawer-side">
    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
    <ul className="menu bg-[#EEBF9F] lg:bg-[#EEBF9F]/10 text-base-content min-h-full w-70 p-0">

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
            to="/admin/requests"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#EEBF9F] transition ${
                isActive ? "bg-[#EEBF9F] font-semibold" : ""
              }`
            }
          >
            <FiBookOpen size={20} />
            Course Requests
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

export default AdminLayout;