import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { SiThealgorithms } from "react-icons/si";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation (optional)
    if (!name || !email || !password) {
      return toast.error("All fields are required");
    }

    try {
      // Make a POST request to the register API
      const response = await axios.post("http://localhost:5000/api/users/register", {
        username: name,
        email,
        password,
      });

      // If registration is successful
      if (response.status === 201) {
        toast.success("Registration successful! Redirecting to login...");
        navigate("/login"); // Redirect to login page
      } else {
        toast.error(response.data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      // Handle any errors from the API
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message); // Display error from the server
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="h-[100vh] w-[100vw] flex justify-center font-poppins items-center bg-cover bg-opacity-55 bg-primary">
      <h1 className="text-gradient absolute top-0 sm:top-8  text-2xl font-bold font-poppins"> <SiThealgorithms className="inline text-cyan-300 text-3xl -translate-y-[2px] mr-2"/> <Link to={"/"}>AlgoSprint</Link></h1>

      <div className="w-[92%] bg-white backdrop-blur-sm ss:w-[28%] min-h-[67%] rounded-lg shadow-lg py-5 px-8 flex flex-col gap-10 items-center">
        <h1 className="text-3xl font-bold">Signup</h1>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
          <div className="flex flex-col gap-3 mt-5">
            <label className="block text-[1.1rem]">Username</label>
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-6 w-6 opacity-90 mr-[-38px]"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="grow pl-[38px] outline-none bg-slate-200 px-3 py-2 rounded-lg"
                placeholder="Enter name here"
              />
            </label>
          </div>

          <div className="flex flex-col gap-3 mt-5">
            <label className="block text-[1.1rem]">Email</label>
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-6 w-6 opacity-90 mr-[-38px]"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="grow pl-[38px] outline-none bg-slate-200 px-3 py-2 rounded-lg"
                required
                placeholder="Enter e-mail here"
              />
            </label>
          </div>

          <div className="flex flex-col gap-3 mt-5">
            <label className="block text-[1.1rem]">Password</label>
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-6 w-6 opacity-90 mr-[-38px]"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="password"
                placeholder="Enter password here"
                value={password}
                required
                className="grow pl-[38px] outline-none bg-slate-200 px-3 py-2 rounded-lg"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>

          <p>
            Already have an account?{" "}
            <Link className="underline text-blue-800" to="/login">
              Login
            </Link>
          </p>
          <button
            className="block tracking-wide grow rounded-lg text-white bg-slate-800 hover:bg-slate-900 py-3 text-[1.2rem] my-3 duration-200"
            type="submit"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
