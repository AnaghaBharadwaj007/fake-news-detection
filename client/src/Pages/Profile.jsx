import { useState } from "react";
import {
  FaCheckCircle,
  FaEnvelope,
  FaLock,
  FaSignOutAlt,
  FaTrash,
  FaUserCircle,
} from "react-icons/fa"; // Importing necessary icons

export default function Profile() {
  const [email, setEmail] = useState("user.email@example.com"); // Placeholder for user email
  const [newEmail, setNewEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Placeholder functions for functionality
  const handleUpdateEmail = (e) => {
    e.preventDefault();
    // Your email update logic here
    console.log("Updating email to:", newEmail);
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    // Your password update logic here
    console.log(
      "Updating password. Current:",
      currentPassword,
      "New:",
      newPassword
    );
  };

  const handleLogout = () => {
    // Your logout logic here
    console.log("User logging out.");
  };

  const handleDeleteAccount = () => {
    // Show confirmation modal
    setShowDeleteModal(true);
  };

  const confirmDeleteAccount = () => {
    // Your account deletion logic here (after user confirms)
    console.log("Account deletion confirmed!");
    setShowDeleteModal(false);
  };

  const cancelDeleteAccount = () => {
    setShowDeleteModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 py-12 font-sans">
      <div className="w-full max-w-2xl bg-gray-800 rounded-xl shadow-2xl p-8 md:p-12 border border-gray-700">
        <div className="flex flex-col items-center mb-8">
          <FaUserCircle className="text-sky-400 text-6xl mb-4" />
          <h2 className="text-3xl font-bold text-white mb-2">User Profile</h2>
          <p className="text-gray-300 text-lg flex items-center gap-2">
            <FaEnvelope className="text-gray-500" /> {email}
          </p>
        </div>

        {/* Update Email Section */}
        <div className="mb-10 p-6 bg-gray-700 rounded-lg border border-gray-600">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <FaEnvelope className="text-sky-400" /> Update Email
          </h3>
          <form onSubmit={handleUpdateEmail} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="New Email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="bg-gray-600 border border-gray-500 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-400 outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-colors duration-200"
              required
            />
            <button
              type="submit"
              className="bg-sky-600 text-white py-3 rounded-lg hover:bg-sky-700 shadow-md transition duration-200 font-semibold text-lg flex items-center justify-center gap-2"
            >
              <FaCheckCircle /> Save New Email
            </button>
          </form>
        </div>

        {/* Update Password Section */}
        <div className="mb-10 p-6 bg-gray-700 rounded-lg border border-gray-600">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <FaLock className="text-sky-400" /> Update Password
          </h3>
          <form onSubmit={handleUpdatePassword} className="flex flex-col gap-4">
            <input
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="bg-gray-600 border border-gray-500 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-400 outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-colors duration-200"
              required
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="bg-gray-600 border border-gray-500 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-400 outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-colors duration-200"
              required
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              className="bg-gray-600 border border-gray-500 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-400 outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-colors duration-200"
              required
            />
            <button
              type="submit"
              className="bg-sky-600 text-white py-3 rounded-lg hover:bg-sky-700 shadow-md transition duration-200 font-semibold text-lg flex items-center justify-center gap-2"
            >
              <FaCheckCircle /> Save New Password
            </button>
          </form>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <button
            onClick={handleLogout}
            className="w-full bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 shadow-md transition duration-200 font-semibold text-lg flex items-center justify-center gap-2"
          >
            <FaSignOutAlt /> Logout
          </button>
          <button
            onClick={handleDeleteAccount}
            className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 shadow-md transition duration-200 font-semibold text-lg flex items-center justify-center gap-2"
          >
            <FaTrash /> Delete Account
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-8 shadow-2xl border border-gray-700 max-w-md text-center transform scale-100 opacity-100 transition-all duration-300">
            <h3 className="text-2xl font-bold text-red-500 mb-4">
              Confirm Deletion
            </h3>
            <p className="text-gray-300 mb-6">
              Are you sure you want to delete your account? This action cannot
              be undone.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmDeleteAccount}
                className="bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700 transition duration-200 font-semibold"
              >
                Delete Anyway
              </button>
              <button
                onClick={cancelDeleteAccount}
                className="bg-gray-600 text-white py-2 px-6 rounded-lg hover:bg-gray-700 transition duration-200 font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
