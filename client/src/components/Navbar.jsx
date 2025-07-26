import {
  FaHistory,
  FaInfoCircle,
  FaSearch,
  FaShieldAlt,
  FaTachometerAlt,
  FaUser,
} from "react-icons/fa";
import { Link, NavLink } from "react-router-dom"; // Import both Link and NavLink

export default function Navbar() {
  return (
    // Main container for the navbar with a dark background and shadow
    <div className="bg-gray-950 shadow-lg">
      {" "}
      {/* Reverted to bg-gray-950 */}
      <div className="flex items-center justify-between  mx-auto px-6 py-4">
        {" "}
        {/* Re-added max-w-7xl */}
        <h1 className="font-bold text-2xl text-white flex items-center gap-2">
          {/* TruthLens logo remains a simple Link, not highlighted */}
          <Link to="/" className="flex items-center gap-2">
            <FaShieldAlt className="text-sky-400" />
            <span>TruthLens</span>
          </Link>
        </h1>
        <ul className="flex items-center gap-10 text-base font-medium">
          {/* NavLink for Detect */}
          <NavLink
            to="/detect"
            className={({ isActive }) =>
              `flex items-center gap-2 transition-colors duration-200 ${
                isActive
                  ? "text-sky-400 font-semibold"
                  : "text-gray-300 hover:text-sky-400"
              }`
            }
          >
            <FaSearch /> Detect
          </NavLink>

          {/* NavLink for History */}
          <NavLink
            to="/history"
            className={({ isActive }) =>
              `flex items-center gap-2 transition-colors duration-200 ${
                isActive
                  ? "text-sky-400 font-semibold"
                  : "text-gray-300 hover:text-sky-400"
              }`
            }
          >
            <FaHistory /> History
          </NavLink>

          {/* NavLink for Dashboard */}
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-2 transition-colors duration-200 ${
                isActive
                  ? "text-sky-400 font-semibold"
                  : "text-gray-300 hover:text-sky-400"
              }`
            }
          >
            <FaTachometerAlt /> Dashboard
          </NavLink>

          {/* NavLink for About */}
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `flex items-center gap-2 transition-colors duration-200 ${
                isActive
                  ? "text-sky-400 font-semibold"
                  : "text-gray-300 hover:text-sky-400"
              }`
            }
          >
            <FaInfoCircle /> About
          </NavLink>

          {/* NavLink for Profile */}
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `flex items-center gap-2 transition-colors duration-200 ${
                isActive
                  ? "text-sky-400 font-semibold"
                  : "text-gray-300 hover:text-sky-400"
              }`
            }
          >
            <FaUser /> Profile
          </NavLink>
        </ul>
      </div>
    </div>
  );
}
