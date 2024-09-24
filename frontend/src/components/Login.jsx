import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // Importing AuthContext
import { SiThealgorithms } from "react-icons/si";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // Get login, isAuthenticated, and error from AuthContext
  const { login, isAuthenticated, error } = useContext(AuthContext);
  
  const navigate = useNavigate();

  // Redirect to home if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/"); // Redirect to home or dashboard after login
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Call login function from context with email and password
    await login(email, password);
  };

  return (
    <div className="h-[100vh] font-poppins w-[100vw] flex justify-center items-center bg-cover bg-opacity-55 bg-primary">
      <h1 className="text-gradient absolute top-8 sm:top-8  text-2xl font-bold font-poppins"> <SiThealgorithms className="inline text-cyan-300 text-3xl -translate-y-[2px] mr-2"/> <Link to={"/"}>AlgoSprint</Link></h1>
      
      <div className="w-[92%] bg-white backdrop-blur-sm ss:w-[28%] min-h-[58%] rounded-lg shadow-lg py-5 gap-10 px-8 flex flex-col items-center">

        <h1 className="text-3xl font-bold">Login</h1> 

        <form onSubmit={handleLogin} className="w-full flex flex-col gap-3">
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
                  placeholder="Enter password here"
                  type="password"
                  value={password}
                  required
                  className="grow pl-[38px] outline-none bg-slate-200 px-3 py-2 rounded-lg"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
            </div>

          {/* Display error message */}
          {error && <p className="text-red-500">{error}</p>}

          <p>
            Don’t have an account?{" "}
            <Link className="underline text-blue-800" to="/register">
              Signup
            </Link>
          </p>
          <button
            className="block tracking-wide grow rounded-lg text-white bg-slate-800 py-3 text-[1.2rem] my-3 hover:bg-slate-900 duration-200"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
