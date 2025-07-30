import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { authContext } from '../../context/AuthProvider';
import { BsBell } from "react-icons/bs";import { FaUserCircle } from 'react-icons/fa';
import { HiOutlineBars3 } from "react-icons/hi2";

const SideNav = () => {
    const{dbUser,user,getTokenHeader,logOut,baseUrl}=useContext(authContext);
  const navigate=useNavigate();
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
    return (
        <div className="flex items-center justify-between px-6 py-4 bg-white">
            <label htmlFor="my-drawer-2" className="btn btn-sm drawer-button lg:hidden">
      <HiOutlineBars3 className='w-full'/>
    </label>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <BsBell size={20} />
            </button>
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
                              {dbUser?.profile_pic ? <img className="w-6 h-6 rounded-full" src={dbUser2.profile_pic}></img>
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
                            <button onClick={handleSignOut}>Sign Out</button>
                          </li>
                        </ul>
                      </div>
          </div>
        </div>
    );
};

export default SideNav;