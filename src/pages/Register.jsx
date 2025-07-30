import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../context/AuthProvider";
import Swal from 'sweetalert2';

const Register = () => {
  const { googlelogin, emailSignup, syncUser } = useContext(authContext);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const pass = e.target.password.value;

    try {
      const result = await emailSignup(email, pass);
      
      // Sync user after successful registration
      await syncUser(name || result.user.email);

      Swal.fire({
        title: "Success",
        icon: "success",
        text: "Registration successful! Please login.",
        confirmButtonText: "OK",
      });

      e.target.reset();
      navigate('/auth/login');
    } catch (err) {
      console.error("Registration error:", err);
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: err.message,
      });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await googlelogin();
      
      await syncUser(result.user.displayName || result.user.email);

      Swal.fire({
        title: "Success",
        icon: "success",
        text: "Registration successful!",
        confirmButtonText: "OK",
      });

      navigate('/');
    } catch (err) {
      console.error("Google registration error:", err);
      Swal.fire({
        icon: "error",
        title: "Google Registration Failed",
        text: err.message,
      });
    }
  };

  return (
    <div className="flex flex-col-reverse pt-20 md:pt-6 md:flex-row-reverse justify-between items-center px-3 md:pl-10 lg:pl-30">
      <div className="w-full md:w-1/2 lg:pr-15">
        <DotLottieReact src="/log1.lottie" loop autoplay className="w-full h-160" />
      </div>
      <div className="w-full md:w-1/2 lg:w-1/3 shadow-lg bg-[#EEBF9F66] border-base-300 rounded-box border p-10 space-y-4 text-lg">
        <form onSubmit={handleRegister} className="fieldset">
          <label className="label text-base md:text-lg">Name</label>
          <input
            type="text"
            name="name"
            className="input input-bordered w-full text-base"
            placeholder="Name"
            required
          />
          
          <label className="label text-base md:text-lg">Email</label>
          <input
            type="email"
            name="email"
            className="input input-bordered w-full text-base"
            placeholder="Email"
            required
          />

          <label className="label text-base md:text-lg">Password</label>
          <input
            type="password"
            name="password"
            className="input input-bordered w-full text-base"
            placeholder="Password"
            required
          />

          <button className="btn bg-[#A75A44] w-full text-base text-white">
            Register
          </button>
        </form>
        
        <p className="text-sm md:text-base">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-red-800 hover:underline">
            Login
          </Link>
        </p>
        
        <button
          className="btn bg-[#A75A44] w-full text-base text-white"
          onClick={handleGoogleLogin}
        >
          Register with Google
        </button>
      </div>
    </div>
  );
};

export default Register;