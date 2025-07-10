import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../context/AuthProvider";
import Swal from 'sweetalert2'


const Register = () => {
  const { googlelogin, baseUrl, emailSignup,setUser } = useContext(authContext);
  const navigate=useNavigate();
  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const pass = e.target.password.value;
    const role = e.target.role.value.toLowerCase();
    
    emailSignup(email, pass)
      .then((result) => {
        const profilePic = result.user.photoURL;
        const reg_date = result.user.metadata.creationTime;
        const lastLogin = result.user.metadata.lastSignInTime;
        const user = { name, email, profilePic, reg_date, lastLogin, role };
        fetch(`${baseUrl}/user`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(user),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.user_id) {
              Swal.fire({
                title: "Sucess",
                icon: "success",
                confirmButtonText: 'OK',
          })
          .then((result) => {
    if (result.isConfirmed) {
      
      navigate('/auth/login');
    }
  });
        }
        else {
          alert('failed');
        }
      });
      })
      .catch((err) => {
        alert("Error signing up", err.message);
      });
  };
  const handleGoogleLogin = (role) => {
    googlelogin()
      .then((result) => {
        setUser(result.user);
        const name = result.user.displayName;
        const email = result.user.email;
        const profilePic = result.user.photoURL;
        const reg_date = result.user.metadata.creationTime;
        const lastLogin = result.user.metadata.lastSignInTime;
        const user = {
          name,
          email,
          profilePic,
          reg_date,
          lastLogin,
          role: role.toLowerCase(),
        };
        fetch(`${baseUrl}/user`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(user),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.insertedId) {
              alert("User created");
              document.getElementById("my_modal_1").close();
            }
          });
      })
      .catch((err) => {
        console.error(err);
        alert("Google login failed");
      });
  };
  return (
    <div className="flex flex-col-reverse pt-20 md:pt-6 md:flex-row-reverse justify-between items-center px-3 md:pl-10 lg:pl-30">
      <div className="w-full md:w-1/2 lg:pr-15">
        <DotLottieReact
          src="/log1.lottie"
          loop
          autoplay
          className="w-full h-160"
        />
      </div>
      <div className="w-full md:w-1/2 lg:w-1/3 shadow-lg  bg-[#EEBF9F66] border-base-300 rounded-box border p-10 space-y-4 text-lg">
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
          <label className="label text-base md:text-lg">Role</label>
          <select
            name="role"
            className="select select-bordered w-full text-base"
            required
            defaultValue=""
          >
            <option value="" disabled>
              Select your role
            </option>
            <option value="Teacher">Teacher</option>
            <option value="Student">Student</option>
          </select>

          <label className="label text-base md:text-lg">Password</label>
          <input
            type="password"
            name="password"
            className="input input-bordered w-full text-base"
            placeholder="Password"
          />

          <button className="btn  bg-[#A75A44] w-full text-base text-white">
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
          className="btn   bg-[#A75A44] w-full text-base text-white"
          onClick={() => document.getElementById("my_modal_1").showModal()}
        >
          Log in with Google
        </button>

        <dialog id="my_modal_1" className="modal text-center">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Sign In as </h3>
            <div className="modal-action justify-center flex flex-col">
              <form method="dialog" className="flex flex-col gap-4">
                <button
                  className="btn"
                  onClick={() => handleGoogleLogin("teacher")}
                >
                  Teacher
                </button>
                <button
                  className="btn"
                  onClick={() => handleGoogleLogin("student")}
                >
                  Student
                </button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default Register;
