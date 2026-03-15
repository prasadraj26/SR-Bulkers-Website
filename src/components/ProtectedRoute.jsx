import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const ProtectedRoute = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);

  // While Firebase checks login state
  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <p>Checking admin access...</p>
      </div>
    );
  }

  // If authentication failed or user not logged in
  if (!user || error) {
    return <Navigate to="/admin" replace />;
  }

  // User is authenticated
  return children;
};

export default ProtectedRoute;