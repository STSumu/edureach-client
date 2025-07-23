
import logo from "../../assets/logo.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { useContext, useState, useEffect } from "react";
import Swal from "sweetalert2";
import { authContext } from "../../context/AuthProvider";

const EnrollNav = () => {

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const { user, logOut} = useContext(authContext);
 const [search, setSearch] = useState("");
const navigate = useNavigate();

  const handleSignOut = () => {
    logOut()
      .then(() => {
        Swal.fire({
          title: "Success",
          icon: "success",
          text: `${user.displayName || "User"} logged out successfully`,
          draggable: true,
        });
      })
      .catch((err) => {
        alert(err);
      });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search?search=${encodeURIComponent(search)}`);
      setSearch(""); // clear input
    }
  };

  

  return (
    <div className={`navbar z-10 ${scrolled ? 'bg-[#A75A44]': 'bg-transparent'} px-2 md:px-8  shadow-sm fixed`}>
      <div className="navbar-start">

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

      </div>

      <div className="navbar-end flex items-center ml-auto space-x-4 pr-4 text-black">


        {user ? (
          <div className="dropdown dropdown-end text-black">
            <div tabIndex={0} role="button" className="w-12 h-12">
         <lord-icon
      src="https://cdn.lordicon.com/hroklero.json"
      trigger="hover"
      colors="primary:#c74b16,secondary:#ffc738"
      className='w-full h-full'
    ></lord-icon>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-1 overflow-hidden p-2 shadow-sm"
            >
              <li className="border-b-1 border-gray-300">
                <div className="flex gap-2 items-center">
                  <div className="bg-amber-900 rounded-full w-6 h-6 text-white flex items-center justify-center text-sm">
                    {user.photoURL ||
                      user?.displayName
                        ?.split(" ")
                        .map((word) => word[0].toUpperCase())
                        .join("") ||
                      user?.email?.trim()[0].toUpperCase()}
                  </div>
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
                <button onClick={handleSignOut}>Sign Out</button>
              </li>
            </ul>
          </div>
        ) : (
          <Link
            to="/auth/login"
            className="btn bg-[#B14E0F] hidden md:flex text-white text-lg rounded-lg"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default EnrollNav;
