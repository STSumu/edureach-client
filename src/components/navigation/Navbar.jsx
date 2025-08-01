
import logo from "../../assets/logo.png";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { useContext, useState, useEffect } from "react";
import { authContext } from "../../context/AuthProvider";
import Swal from "sweetalert2";
import Loading from "../Loading";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location=useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const { user, logOut,dbUser,getTokenHeader,baseUrl} = useContext(authContext);
 const [search, setSearch] = useState("");
const navigate = useNavigate();

const handleSignOut = async () => {
  try {
    const headers = await getTokenHeader();
    await fetch(`${baseUrl}/user/deactivate`, {
      method: "PUT",
      headers: headers,
    });

    await logOut();

    Swal.fire({
      title: "Success",
      icon: "success",
      text: `${user.displayName || "User"} logged out successfully`,
      draggable: true,
    }).
    then(() => { 
            navigate('/');
          });
  } catch (err) {
    alert("Error logging out: " + err.message);
  }
};

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search?search=${encodeURIComponent(search)}`);
      setSearch(""); // clear input
    }
  };
  
  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
        {
          dbUser?.role === 'admin' && <li><NavLink to='/admin'>Admin Panel</NavLink></li>
}
          <li>
          <NavLink to="/teacher">Instructor</NavLink>
        </li>
      
        <li>
          <NavLink to="/mylearning">My Learning</NavLink>
        </li>
      <li>
        <NavLink to="/courses">Explore</NavLink>
      </li>
    </>
  );

  return (
    <div className={`navbar z-10 px-2 ${scrolled ? 'bg-[#A75A44]': 'bg-transparent'} ${location.pathname==='/dashboard' ? 'shadow-none' : 'shadow-sm md:px-8 lg:px-25'}   fixed`}>
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden text-black">
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

        {/* Brand */}
        <div className="flex flex-col leading-none ml-1">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="w-8 h-8 mt-[16px]" />
            <Link
              to="/"
              className="btn btn-ghost text-2xl font-bold text-black font-serif hover:text-gray-700 transition duration-300 p-0 min-h-0 h-auto"
            >
              EduReach
            </Link>
          </div>
          <span className={`text-xs md:text-sm ${scrolled ? 'text-white' : 'text-gray-500'} italic pl-4 ml-[28px] mt-[-17px]`}>
            E-Learning System
          </span>
        </div>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className={`menu menu-horizontal ${scrolled && 'text-white'} px-1 space-x-4 flex items-center`}>{links}</ul>
      </div>

      <div className="navbar-end flex items-center ml-auto space-x-4 pr-4 text-black">
        {/* ✅ SEARCH BAR */}
       <form onSubmit={handleSearch} className="relative hidden md:flex">
  <label className="input">
    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
        <circle cx="11" cy="11" r="8"></circle>
        <path d="m21 21-4.3-4.3"></path>
      </g>
    </svg>
    <input
      type="search"
      className="grow"
      placeholder="Search"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  </label>
</form>


        {/* Icon for mobile (optional) */}
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

        {/* Cart & User */}
        <Link
          to={`/cart`}
          className="text-gray-600 hover:text-black transition duration-200 text-2xl hidden md:flex"
          title="Go to Cart"
        >
          <FaShoppingCart />
        </Link>

        {dbUser ? (
          <div className="dropdown dropdown-end text-black">
            <div tabIndex={0} role="button" className="text-2xl text-gray-600 hover:text-black transition duration-200">
            {
              dbUser?.profile_pic ?
               <img className="w-6 h-6 rounded-full" src={dbUser.profile_pic}></img> 
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
                  {dbUser?.profile_pic ? <img className="w-6 h-6 rounded-full" src={dbUser.profile_pic}></img>
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
              <li className="border-b-1 border-gray-300">
                <Link to='/edit'>My Profile</Link>
              </li>

              <li>
                <button onClick={handleSignOut}>Sign Out</button>
              </li>
            </ul>
          </div>
        ) : (
          <Link
            to="/auth/login"
            className="btn bg-[#B14E0F]
            border-0 shadow-lg hidden md:flex text-white text-lg rounded-lg"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
