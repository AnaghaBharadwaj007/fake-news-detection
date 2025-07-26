import {
  FaHistory,
  FaInfoCircle,
  FaSearch,
  FaTachometerAlt,
  FaUser,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="bg-slate-200">
      <div className="flex items-center justify-between max-w-7.5xl mx-auto px-6 py-4">
        <h1 className="font-bold text-xl">📰 TruthLens</h1>
        <ul className="flex items-center gap-10 text-base font-medium">
          <Link to="/detect">
            <li className="flex items-center gap-2 hover:text-blue-500 transition">
              <FaSearch /> Detect
            </li>
          </Link>
          <Link to="/history">
            <li className="flex items-center gap-2 hover:text-blue-500 transition">
              <FaHistory /> History
            </li>
          </Link>
          <Link to="/dashboard">
            <li className="flex items-center gap-2 hover:text-blue-500 transition">
              <FaTachometerAlt /> Dashboard
            </li>
          </Link>
          <Link to="/about">
            <li className="flex items-center gap-2 hover:text-blue-500 transition">
              <FaInfoCircle /> About
            </li>
          </Link>
          <Link to="/profile">
            <li className="flex items-center gap-2 hover:text-blue-500 transition">
              <FaUser /> Profile
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
}
