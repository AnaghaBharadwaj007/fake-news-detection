import { useUser } from "@supabase/auth-helpers-react";
import { Navigate } from "react-router-dom";
export default function ProtectedRoute({ children }) {
  const user = useUser();

  if (!user) {
    return <Navigate to="/signin" replace />;
  }
  return children;
}
