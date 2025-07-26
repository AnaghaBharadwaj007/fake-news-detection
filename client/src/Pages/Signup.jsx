import { useState } from "react";
import { Link } from "react-router-dom";

export default function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle sign up logic
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="flex w-[950px] rounded-2xl overflow-hidden shadow-xl bg-white">
        {/* Left Panel */}
        <div className="w-1/2 bg-white p-10">
          <h2 className="text-xl font-semibold text-center text-gray-600 mb-2">
            JOIN THE COMMUNITY
          </h2>
          <h1 className="text-3xl font-bold text-black text-center mb-6 flex items-center justify-center gap-2">
            TruthLens
          </h1>
          <p className="text-sm text-center text-gray-500 mb-6">
            Create an account to verify fake news
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="border rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-red-400"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="border rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-red-400"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="border rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-red-400"
              required
            />
            <button
              type="submit"
              className="bg-black text-white py-2 rounded-full hover:bg-gray-900 shadow-md transition duration-200"
            >
              SIGN UP
            </button>
          </form>

          <div className="text-center mt-4 text-sm">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="text-black font-medium hover:underline"
            >
              Sign In
            </Link>
          </div>

          <div className="mt-6 text-center text-gray-400 text-sm">Or</div>
          <div className="flex justify-center gap-4 mt-4">
            <i className="fab fa-facebook text-blue-600 text-xl cursor-pointer" />
            <i className="fab fa-twitter text-sky-400 text-xl cursor-pointer" />
            <i className="fab fa-google text-red-500 text-xl cursor-pointer" />
            <i className="fab fa-linkedin text-blue-800 text-xl cursor-pointer" />
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-1/2 relative">
          <img
            src="/Pics/Sign.png"
            alt="background"
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
          {/* <div className="relative z-10  bg-opacity-50 w-full h-full flex flex-col justify-center items-center p-10 text-black">
            <h1 className="text-4xl font-bold mb-4">TruthLens</h1>
            <p className="text-sm text-center max-w-xs">
              Join Truth Lens and help fight misinformation with every login.
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
}
