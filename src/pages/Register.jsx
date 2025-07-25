import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../context/AuthProvider";
import Swal from 'sweetalert2';

const Register = () => {
    const { googlelogin, emailSignup, setUser, syncUser } = useContext(authContext);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const pass = e.target.password.value;

    emailSignup(email, pass)
      .then(async (result) => {
        setUser(result.user); // Firebase user is now set

        const role="student";
        const syncResponse = await syncUser(role,name);
        if (syncResponse.user_id) {
          Swal.fire({
            title: "Success",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            e.target.reset();
            navigate('/auth/login');
          });
        } else {
          alert("Failed to sync user to backend");
        }
      })
      .catch((err) => {
        alert("Error signing up: " + err.message);
      });
  };

  const handleGoogleLogin = () => {
    const role="student";
    googlelogin()
      .then(async (result) => {
        setUser(result.user);
        const syncResponse = await syncUser(role,result.user.displayName);

        if (syncResponse.user_id) {
          Swal.fire({
            title: "Success",
            icon: "success",
            text: "User synced successfully",
            confirmButtonText: "OK",
          });
          navigate('/');
        } else {
          alert("Failed to sync user to backend");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Google login failed");
      });
  };

  return (
    <div className="flex flex-col-reverse pt-20 md:pt-6 md:flex-row-reverse justify-between items-center px-3 md:pl-10 lg:pl-30">
      <div className="w-full md:w-1/2 lg:pr-15">
        <DotLottieReact src="/log1.lottie" loop autoplay className="w-full h-160" />
      </div>
      <div className="w-full md:w-1/2 lg:w-1/3 shadow-lg bg-[#EEBF9F66] border-base-300 rounded-box border p-10 space-y-4 text-lg">
        <form onSubmit={handleRegister} className="fieldset ">
          <label className="label text-base md:text-lg">Name</label>
          <input
            type="text"
            name="name"
            className="input input-bordered w-full text-base"
            placeholder="Name"
          />
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
          onClick={() => handleGoogleLogin()}
        >
          Log in with Google
        </button>

        
      </div>
    </div>
  );
};

export default Register;
