import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../components/Toast";

function ProtectedRoute({ allowedRoles, children }) {
  const { user } = useAuth();
  const { toast } = useToast();

  if (!user) {
    toast("Please log in", "err");
    return <Navigate to="/login" replace />;
  }
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    toast("Not authorized", "err");
    return <Navigate to="/" replace />;
  }
  return children;
}

export default ProtectedRoute;
