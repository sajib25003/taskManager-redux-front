import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const showToast = () => {
    toast("User LoggedIn Successfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(true);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password");
    // console.log(email, password);

    axiosPublic
      .post("/api/login", { email, password })
      .then((res) => {
        const { token } = res.data;
        localStorage.setItem("token", token);
        showToast();
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((error) => {
        if (error.response) {
          console.error("Server error:", error.response.data);
          alert(`Error: ${error.response.data.message}`);
        } else if (error.request) {
          console.error("No response from server:", error.request);
          alert("Unable to connect to the server. Please try again.");
        } else {
          console.error("Request error:", error.message);
        }
      });
  };
  return (
    <div className="mx-auto  bg-green-50 px-5 min-h-screen">
      <h3 className="text-center font-bold text-xl md:text-2xl lg:text-3xl py-5 pt-3">
        Please Login
      </h3>
      <div className=" flex justify-center  ">
        <form
          onSubmit={handleLogin}
          className="card-body w-4/5 lg:w-1/2 space-y-3 border-2 border-grey-300 shadow-3xl h- rounded-lg p-5 bg-slate-100"
        >
          <div className="form-control">
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full p-3 rounded-md text-black"
              required
              name="email"
            />
          </div>
          <div className="form-control">
            <div className="relative">
              <input
                type={!showPassword ? "text" : "password"}
                placeholder="Password"
                className="input input-bordered w-full p-3 rounded-md mb-3 text-black"
                name="password"
                required
              />
              <span
                className="absolute top-1/3 right-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>}
              </span>
            </div>

            <label className="label">
              <a
                href="#"
                className="label-text-alt text-black font-semibold link link-hover"
              >
                Forgot password?
              </a>
            </label>
          </div>
          {/* login button */}
          <div className="form-control mt-6 text-right">
            <input
              // disabled={loginDisabled}
              className="py-2 rounded-md border-white bg-black hover:scale-105 text-white font-bold w-2/5"
              type="submit"
              value="Login"
            />
          </div>
          <p className=" text-base text-black font-semibold">
            New here?{" "}
            <Link to="/register" className=" font-bold text-blue-700">
              Create an account.
            </Link>
          </p>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
