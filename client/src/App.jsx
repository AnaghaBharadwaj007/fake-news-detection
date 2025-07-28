import { AnimatePresence, motion } from "framer-motion";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import About from "./Pages/About";
import Dashboard from "./Pages/Dashboard";
import Detection from "./Pages/Detection";
import History from "./Pages/History";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import Signin from "./Pages/Signin";
import SignUp from "./Pages/Signup";

// Define animation variants for page transitions
const pageVariants = {
  initial: {
    opacity: 0,
  },
  in: {
    opacity: 1,
  },
  out: {
    opacity: 0,
  },
};

// Define transition properties
const pageTransition = {
  type: "tween",
  ease: "easeInOut",
  duration: 0.3,
};

function AppContent() {
  const location = useLocation();

  return (
    <>
      <Navbar />
      {/* AnimatePresence allows components to animate when they are removed from the React tree */}
      <AnimatePresence mode="wait">
        {/* The key and location props are crucial for AnimatePresence to detect route changes */}
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
                style={{ width: "100%" }}
              >
                <Home />
              </motion.div>
            }
          />
          <Route
            path="/signin"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
                style={{ width: "100%" }}
              >
                <Signin />
              </motion.div>
            }
          />
          <Route
            path="/signup"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
                style={{ width: "100%" }}
              >
                <SignUp />
              </motion.div>
            }
          />
          <Route
            path="/about"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
                style={{ width: "100%" }}
              >
                <About />
              </motion.div>
            }
          />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
                style={{ width: "100%" }}
              >
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              </motion.div>
            }
          />
          <Route
            path="/detect"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
                style={{ width: "100%" }}
              >
                <ProtectedRoute>
                  <Detection />
                </ProtectedRoute>
              </motion.div>
            }
          />
          <Route
            path="/history"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
                style={{ width: "100%" }}
              >
                <ProtectedRoute>
                  <History />
                </ProtectedRoute>
              </motion.div>
            }
          />
          <Route
            path="/profile"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
                style={{ width: "100%" }}
              >
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              </motion.div>
            }
          />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
