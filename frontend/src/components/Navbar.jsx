// src/components/Navbar.js
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { close,  menu, people03 } from "../assets";
import { Link } from "react-router-dom";
import logo from '../assets/algo.png'

import { SiThealgorithms } from "react-icons/si";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);

  // Accessing AuthContext
  const { isAuthenticated, user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-primary w-full px-3 md:px-10 flex py-6 justify-between items-center navbar text-white">
      {/* <img src={logo} alt="algosprint" className="w-[124px] h-[100px]" /> */}
      <Link to={"/"}>      <h1 className="text-gradient text-2xl font-bold font-poppins"> <SiThealgorithms className="hidden  sm:inline text-cyan-300 text-3xl -translate-y-[2px] mr-2"/> AlgoSprint</h1>
      </Link>
      <div className="flex gap-3">
        <ul className="list-none sm:flex hidden justify-end items-center gap-10 flex-1">
          <li className={`font-poppins font-normal cursor-pointer text-[16px]`}>
            <Link to={"/"}>Home</Link>
          </li>

          <li className={`font-poppins hover:text-secondary font-normal cursor-pointer text-[16px]`}>
            <Link to={"/problems"}>Problems</Link>
          </li>

          <li className={`font-poppins hover:text-secondary font-normal cursor-pointer text-[16px]`}>
            <Link to={"/chat"}>Chat support</Link>
          </li>
        </ul>

        <div className="sm:hidden flex flex-1 justify-end items-center">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-[28px] h-[28px] object-contain"
            onClick={() => setToggle(!toggle)}
          />

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar z-20`}
          >
            <ul className="list-none flex justify-end items-start flex-1 flex-col">
              <li className={`font-poppins font-medium cursor-pointer text-[16px] mb-4`}>
                <Link to={"/"}>Home</Link>
              </li>
              <li className={`font-poppins font-medium cursor-pointer text-[16px] mb-4`}>
              <Link to={"/problems"}>Problems</Link>
              </li>
              <li className={`font-poppins font-medium cursor-pointer text-[16px] mb-4`}>
                <Link to={"/chat"}>Chat support</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Conditionally render Login/Logout and Avatar */}
        {isAuthenticated ? (
          <>
            <button
              onClick={logout}
              className="font-poppins font-normal mr-[-28px] sm:mr-0 sm:ml-4  cursor-pointer text-[16px] text-white hover:bg-white hover:text-primary border-slate-400 border-2 rounded-xl px-3 py-2"
            >
              Logout
            </button>
            <Link to={"/profile"} className="text-white font-poppins font-normal cursor-pointer text-[16px]">
              <img className=" hidden sm:block sm:w-11 sm:h-11" src={user?.avatar || people03} alt="User Avatar" />
            </Link>
          </>
        ) : (
          <Link to={"/login"}>
            <button className="font-poppins font-normal cursor-pointer text-[16px] text-white hover:bg-white hover:text-primary border-slate-400 border-2 rounded-xl px-3 py-2">
              Login
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
