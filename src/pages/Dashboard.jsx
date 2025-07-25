
import { useContext } from 'react';
import { authContext } from '../context/AuthProvider';
import { Link } from 'react-router-dom';
const Dashboard = () => {
    const {dbUser}=useContext(authContext);
    console.log(dbUser.role);
    const links = {
  student: [
    { name: "My Courses", path: "/mycourses" },
    { name: "Progress", path: "/progress" },
  ],
  teacher: [
    { name: "My Courses", path: "/courses" },
    { name: "Create Course", path: "/create" },
  ],
  admin: [
    { name: "Manage Users", path: "/dashboard/admin/users" },
    { name: "Reports", path: "/dashboard/admin/reports" },
  ],
};
    return (
       <>
       <div className="drawer lg:drawer-open -mt-9 -mb-9">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content flex flex-col items-center justify-center">
    
    
    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
      Open drawer
    </label>
  </div>
  <div className="drawer-side">
    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
    <ul className="menu  bg-[#EEBF9F]/10 text-base-content min-h-full w-80 px-2 pt-40">
     
      {links[dbUser.role].map((item)=>
        <li><Link to={item.path}>{item.name}</Link></li>
      )}
    </ul>
  </div>
</div>

       </>
    );
};

export default Dashboard;
