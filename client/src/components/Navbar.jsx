import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="bg-gray-200 w-full backdrop-blur-md border-b border-gray-200 shadow-md py-4 px-6 sticky top-0 z-50">
      <div className="w-full flex flex-wrap justify-between items-center">
        {/* Left: Brand or Greeting */}
        <div className="text-2xl font-extrabold text-purple-700 transition duration-300">
          {user ? (
            <span className="text-2xl font-bold text-purple-700">
              👋 Hi, {user.name}
            </span>
          ) : (
            <Link
              to="/"
              className="hover:text-purple-800 transition duration-200 hover:scale-105"
            >
              NotesApp
            </Link>
          )}
        </div>

        {/* Right: Navigation */}
        <div className="flex flex-wrap items-center gap-4 mt-2 sm:mt-0">
          {user ? (
            <>
              <Link
                to="/create"
                className="text-slate-700 font-medium hover:text-purple-600 transition duration-200"
              >
                New Note
              </Link>
              <Link
                to="/notes"
                className="text-slate-700 font-medium hover:text-purple-600 transition duration-200"
              >
                My Notes
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-md shadow-md transition-transform duration-200 hover:scale-105"
              >
                <FiLogOut /> Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-slate-700 font-medium hover:text-purple-600 transition duration-200"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-slate-700 font-medium hover:text-purple-600 transition duration-200"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
