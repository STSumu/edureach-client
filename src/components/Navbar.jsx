import logo from "../assets/logo.png";
import { Link, NavLink } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { useContext } from "react";
import { authContext } from "../context/AuthProvider";
import Swal from "sweetalert2";

const Navbar = () => {
  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/about">About</NavLink>
      </li>
      <li>
        <NavLink to="/courses">Courses</NavLink>
      </li>
      <li>
        <NavLink to="/profile">Profile</NavLink>
      </li>
      <li>
        <NavLink to="/auth/login">Contact</NavLink>
      </li>
    </>
  );

  const { user,logOut } = useContext(authContext);
  const handleSignOut=()=>{
    logOut()
    .then(()=>{
      Swal.fire({
                title: "Sucess",
                icon: "success",
                text: `${user.displayName || 'User'} logged out successfully`,
                draggable: true,
              });
    })
    .catch((err)=>{
      console.log(err);
    })
  }
  

  return (
    <div className="navbar bg-transparent px-2 md:px-8 lg:px-25 shadow-sm">
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
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow space-y-2"
          >
            {links}
          </ul>
        </div>

        {/* 🔽 Brand with subtitle */}
        <div className="flex flex-col leading-none ml-1">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="w-8 h-8 mt-[16px]" />
            <a className="btn btn-ghost text-2xl font-bold text-black font-serif hover:text-gray-700 transition duration-300 p-0 min-h-0 h-auto">
              EduReach
            </a>
          </div>
          <span className="text-xs md:text-sm text-gray-500 italic pl-4 ml-[28px] mt-[-17px]">
            E-Learning System
          </span>
        </div>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-4">{links}</ul>
      </div>

      <div className="navbar-end flex items-center ml-auto space-x-4 pr-4">
        <div className="relative hidden md:flex">
          <label className="input">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input type="search" className="grow" placeholder="Search" />
          </label>
        </div>

        <svg
          className="h-6 opacity-50 md:hidden"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
        <button className="text-2xl text-black hover:text-black transition duration-200">
          <FaShoppingCart />
        </button>
        {user ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="text-2xl text-gray-600 hover:text-black transition duration-200">
          <FaUserCircle />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-1 overflow-hidden p-2 shadow-sm"
            >
              <li className=" border-b-1 border-gray-300">
                <div className="flex ">
                  <div className="bg-amber-900 rounded-full w-4 h-4 text-white flex items-center justify-center">{user.photoURL || user?.displayName?.split(' ').map(word => word[0].toUpperCase()).join('') || user?.email?.trim()[0].toUpperCase()}</div>
                  <div>
                    <h5>{user.displayName}</h5>
                    <p>{user.email}</p>
                    </div>
                </div>
              </li>
              <li>
                <Link>My Courses</Link>
              </li>
              <li>
                <Link>My Cart</Link>
              </li>
              <li className=" border-b-1 border-gray-300">
                <Link>My WishList</Link>
              </li>
              <li>
                <button onClick={handleSignOut}>Sign Out</button>
              </li>
            </ul>
          </div>
        ) : (
          <Link
            to="/auth/login"
            className="btn bg-[#A75A44] hidden md:flex text-bold text-white text-lg rounded-lg "
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
