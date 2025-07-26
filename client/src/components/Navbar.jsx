import {
  FaHistory,
  FaInfoCircle,
  FaSearch,
  FaShieldAlt,
  FaTachometerAlt,
  FaUser,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    // Main container for the navbar with a dark background and shadow
    <div className="bg-gray-900 shadow-lg">
      <div className="flex items-center justify-between  mx-auto px-6 py-4">
        {/* TruthLens logo with the new icon and white text */}
        <h1 className="font-bold text-2xl text-white flex items-center gap-2">
          <FaShieldAlt className="text-sky-400" /> TruthLens
        </h1>
        {/* Navigation links with updated dark mode colors and hover effects */}
        <ul className="flex items-center gap-10 text-base font-medium text-gray-300">
          <Link to="/detect">
            <li className="flex items-center gap-2 hover:text-sky-400 transition duration-200">
              <FaSearch /> Detect
            </li>
          </Link>
          <Link to="/history">
            <li className="flex items-center gap-2 hover:text-sky-400 transition duration-200">
              <FaHistory /> History
            </li>
          </Link>
          <Link to="/dashboard">
            <li className="flex items-center gap-2 hover:text-sky-400 transition duration-200">
              <FaTachometerAlt /> Dashboard
            </li>
          </Link>
          <Link to="/about">
            <li className="flex items-center gap-2 hover:text-sky-400 transition duration-200">
              <FaInfoCircle /> About
            </li>
          </Link>
          <Link to="/profile">
            <li className="flex items-center gap-2 hover:text-sky-400 transition duration-200">
              <FaUser /> Profile
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
}
