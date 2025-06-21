import React from "react";
import logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";
import { FaHome, FaInfoCircle, FaBook, FaUser, FaEnvelope } from "react-icons/fa";


const Navbar = () => {

  const links=<>
 <li>
      <NavLink
        to="/"
        className="block px-4 py-2 font-bold border border-gray-400 rounded-md transition duration-300"
      >
        Home
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/about"
        className="block px-4 py-2 font-bold border border-gray-400 rounded-md transition duration-300"
      >
        About
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/courses"
        className="block px-4 py-2 font-bold border border-gray-400 rounded-md transition duration-300"
      >
        Courses
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/profile"
        className="block px-4 py-2 font-bold border border-gray-400 rounded-md transition duration-300"
      >
        Profile
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/contact"
        className="block px-4 py-2 font-bold border border-gray-400 rounded-md transition duration-300"
      >
        Contact
      </NavLink>
    </li>
  </>

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>

        {/* 🔽 Brand with subtitle */}
       <div className="flex flex-col leading-none ml-1">
  <div className="flex items-center gap-2">
    <img src={logo} alt="Logo" className="w-12 h-12 mt-[16px]" />
    <a className="btn btn-ghost text-2xl font-bold text-black font-serif hover:text-gray-700 transition duration-300 p-0 min-h-0 h-auto">
      EduReach
    </a>
  </div>
 <span className="text-sm text-gray-500 italic pl-8 ml-[28px] mt-[-17px]">
  E-Learning System
</span>

</div>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {links}
        </ul>
      </div>

      <div className="navbar-end">
        <a className="btn">Button</a>
      </div>
    </div>
  );
};

export default Navbar;
