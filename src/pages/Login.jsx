import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { authContext } from "../context/AuthProvider";
import Swal from "sweetalert2";

const Login = () => {
  const { emaillogin ,setUser,baseUrl,googlelogin} = useContext(authContext);
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

  const handleGoogleLogin = (role) => {
      
      googlelogin()
        .then(async(result) => {
          const googleUser = result.user;
    // Check if user exists in your DB
    const res = await fetch(`${baseUrl}/user/${googleUser.email}`);
    const data = await res.json();
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
          if(!data){
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
                Swal.fire({
                  title: "Sucess",
                  icon: "success",
                  text:"User created Successfully",
                  confirmButtonText: 'OK',
                })
                document.getElementById("my_modal_1").close();
              }
            });
          }
          navigate(location.state?.from?.pathname || '/');
        })
        .catch((err) => {
          console.error(err);
          alert("Google login failed");
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
        <button onClick={() => document.getElementById("my_modal_1").showModal()} className="btn   bg-[#A75A44] w-full text-base text-white">
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

export default Login;
