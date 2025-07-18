import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { authContext } from "../context/AuthProvider";
import Swal from "sweetalert2";

const Login = () => {
  const { emaillogin ,setUser} = useContext(authContext);
  const location=useLocation();
  const navigate=useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); 
    const email = e.target.email.value;
    const pass = e.target.password.value;
    
    emaillogin(email, pass)
      .then((result) => {
        setUser(result.user);
        const lastLogin = result.user.metadata.lastSignInTime;
        Swal.fire({
          title: "Sucess",
          icon: "success",
          text: `Welcome ${result.user?.displayName || " "}`,
          draggable: true,
        });
        e.target.reset();
        navigate(location.state?.from?.pathname || '/');
        
      })
      .catch((err) => {
        Swal.fire({
    icon: "error",
    title: "Login Failed",
    text: err.message,
  });
      });
  };
  return (
    <div className="flex flex-col-reverse pt-20 md:pt-6 md:flex-row justify-between items-center px-3 md:pr-15 lg:pr-35">
      <div className="w-full md:w-1/2">
        <DotLottieReact
          src="/log1.lottie"
          loop
          autoplay
          className="w-full h-160"
        />
      </div>
      <div className="w-full md:w-1/2 lg:w-1/3 shadow-lg  bg-[#EEBF9F66] border-base-300 rounded-box border p-10 space-y-4 text-lg">
        <form onSubmit={handleLogin} className="fieldset ">
          <label className="label text-base md:text-lg">Email</label>
          <input
            type="email"
            name="email"
            className="input input-bordered w-full text-base"
            placeholder="Email"
          />

          <label className="label text-base md:text-lg">Password</label>
          <input
            type="password"
            name="password"
            className="input input-bordered w-full text-base"
            placeholder="Password"
          />

          <p className="text-sm md:text-base">
            <Link className="text-blue-600 hover:underline">
              Forget Password?
            </Link>
          </p>

          <button className="btn  bg-[#A75A44] w-full text-base text-white">
            Login
          </button>
        </form>
        <p className="text-sm md:text-base">
          Don't have an account?{" "}
          <Link to="/auth/register" className="text-red-800 hover:underline">
            Register
          </Link>
        </p>
        <button className="btn   bg-[#A75A44] w-full text-base text-white">
          Log in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
