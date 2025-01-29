import {  useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


interface FormData {
  name: string;
  email: string;
  password: string;
  photoURL?: string;
  terms: boolean;
}

const Register = () => {

  const showToast = () => {
    toast("User Created Successfully", {
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

  

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    const { name, email, password, photoURL } = data;

    // console.log(name, email, password, photoURL);

    const userInfo = {
      name: name,
      email: email,
      password: password,
      photoURL: photoURL || null,
    };

    axiosPublic
      .post("/api/users", userInfo)
      .then((res) => {
        console.log("User created:", res.data);
        showToast();
        reset();
        axiosPublic
        .post("/api/login", { email, password })  // Log the user in immediately after registration
        .then((loginRes) => {
          const token = loginRes.data.token;
          localStorage.setItem("token", token); // Save the token to localStorage

          // Redirect to the tasks page
          setTimeout(() => {
            navigate("/");
          }, 2000);
        })
        .catch((error) => {
          console.error("Login error after registration:", error);
          alert("Login failed. Please try again.");
        });
        // setTimeout(() => {
        //   navigate("/tasks");
        // }, 2000);
      })
      .catch((error) => {
        if (error.response) {
          // Server responded with a status code outside the 2xx range
          console.error("Server error:", error.response.data);
          alert(`Error: ${error.response.data.message}`);
        } else if (error.request) {
          // No response received from the server
          console.error("No response from server:", error.request);
          alert("Unable to connect to the server. Please try again.");
        } else {
          // Other errors (e.g., request configuration issue)
          console.error("Request error:", error.message);
        }
      });
  };

  return (
    <div className="mx-auto  bg-green-50 px-5 min-h-screen">
      <h3 className="text-center font-bold text-xl md:text-2xl lg:text-3xl py-5 pt-10">
        Create Account
      </h3>
      <div className=" flex justify-center  ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="card-body w-4/5 lg:w-1/2 space-y-3 border-2 border-grey-300 shadow-3xl h- rounded-lg p-5 bg-slate-100"
        >
          {/* Name Field */}
          <div className="form-control">
            <input
              type="text"
              placeholder="Name"
              className="input input-bordered w-full p-3 rounded-md text-black"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className="text-red-300 mt-1">This field is required</span>
            )}
          </div>

          {/* Photo URL Field */}
          <div className="form-control">
            <input
              type="text"
              placeholder="Photo URL"
              className="input input-bordered w-full p-3 rounded-md text-black"
              {...register("photoURL")}
            />
            {errors.photoURL && (
              <span className="text-red-300 mt-1">This field is required</span>
            )}
          </div>

          {/* Email Field */}
          <div className="form-control">
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full p-3 rounded-md text-black"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-red-300 mt-1">This field is required</span>
            )}
          </div>

          {/* Password Field */}
          <div className="form-control">
            <div className="relative">
              <input
                type={!showPassword ? "text" : "password"}
                placeholder="Password"
                className="input input-bordered w-full p-3 rounded-md text-black"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                  pattern:
                    /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/,
                })}
              />
              {errors.password?.type === "required" && (
                <span className="text-red-300 mt-1">
                  This field is required
                </span>
              )}
              {errors.password?.type === "minLength" && (
                <span className="text-red-300 mt-1">
                  Password should be at least 6 characters
                </span>
              )}
              {errors.password?.type === "maxLength" && (
                <span className="text-red-300 mt-1">
                  Password should be less than 20 characters
                </span>
              )}
              {errors.password?.type === "pattern" && (
                <span className="text-red-300 mt-1">
                  Password must contain one Uppercase letter, one lowercase
                  letter, one number and one special character
                </span>
              )}
              <span
                className="absolute text-blue-700 text-xl top-4 right-3 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {!showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="form-control text-black mt-6">
            <div className="flex gap-3 mb-4">
              <input
                type="checkbox"
                id="terms"
                {...register("terms", { required: true })}
              />
              <label className="text-blue-700 font-semibold" htmlFor="terms">
                Please Read and Accept our{" "}
                <a className="text-orange-600" href="#">
                  Terms & Conditions
                </a>
              </label>
            </div>
            {errors.terms && (
              <span className="text-red-300 mb-2">
                Please accept our Terms & Condition
              </span>
            )}

            {/* Submit Button */}
            <div className="flex justify-end">
              <input
                className="py-2 rounded-md border-white bg-black hover:scale-105 text-white font-bold w-2/5 "
                type="submit"
                value="Register"
              />
            </div>
          </div>

          {/* Existing Account and Social Login */}
          <p className="text-blue-700">
            Already have an account? Please{" "}
            <Link to="/login" className="font-bold text-orange-600">
              Login
            </Link>
          </p>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
