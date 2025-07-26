import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaGoogle,
  FaLinkedinIn,
  FaShieldAlt,
} from "react-icons/fa"; // Importing social icons and TruthLens icon

export default function SignIn() {
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle sign in logic
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="flex w-[950px] rounded-2xl overflow-hidden shadow-2xl bg-gray-800 border border-gray-700">
        {/* Left Panel - Sign In Form */}
        <div className="w-1/2 bg-gray-800 p-10 flex flex-col justify-center">
          <h2 className="text-xl font-semibold text-center text-gray-300 mb-2">
            WELCOME BACK TO
          </h2>
          <h1 className="text-3xl font-bold text-white text-center mb-6 flex items-center justify-center gap-2">
            <FaShieldAlt className="text-sky-400" /> TruthLens
          </h1>
          <p className="text-sm text-center text-gray-400 mb-6">
            Log in to detect the fake news
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-400 outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-colors duration-200"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-400 outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-colors duration-200"
              required
            />
            <button
              type="submit"
              className="bg-sky-600 text-white py-3 rounded-lg hover:bg-sky-700 shadow-md transition duration-200 font-semibold text-lg"
            >
              SIGN IN
            </button>
          </form>

          <div className="text-center mt-6 text-sm text-gray-400">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-sky-400 font-medium hover:underline transition-colors duration-200"
            >
              Sign Up Now
            </Link>
          </div>

          <div className="mt-8 text-center text-gray-500 text-sm">
            Or Sign In with
          </div>
          <div className="flex justify-center gap-6 mt-4">
            <a
              href="#"
              className="text-blue-500 hover:text-blue-400 transition-colors duration-200 text-2xl"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="text-sky-400 hover:text-sky-300 transition-colors duration-200 text-2xl"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="text-red-500 hover:text-red-400 transition-colors duration-200 text-2xl"
            >
              <FaGoogle />
            </a>
            <a
              href="#"
              className="text-blue-700 hover:text-blue-600 transition-colors duration-200 text-2xl"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Right Panel - Image with Overlay Text */}
        <div className="w-1/2 relative bg-gray-950">
          {" "}
          {/* Added a fallback dark background */}
          <img
            src="/Pics/Sign.png"
            alt="background"
            className="absolute inset-0 w-full h-full object-cover z-0 " // Reduced opacity for subtle background
          />
          {/* <div className="relative z-10  bg-opacity-70 w-full h-full flex flex-col justify-center items-center p-10 text-white text-center">
            <h1 className="text-4xl font-bold mb-4">TruthLens</h1>
            <p className="text-lg text-gray-300 max-w-xs leading-relaxed">
              At TruthLens, verify any news instantly so you never fall for fake
              information again.
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
}
