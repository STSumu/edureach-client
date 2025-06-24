import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Link } from "react-router-dom";

const Login = () => {
  const handleLogin = (e) => {
    e.preventDefault(); // Add this
  const email=e.target.email.value;
  const pass=e.target.password.value;

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
          <Link to="/auth/register" className="text-red-800 hover:underline">Register</Link>
        </p>
        <button className="btn   bg-[#A75A44] w-full text-base text-white">
          Log in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
