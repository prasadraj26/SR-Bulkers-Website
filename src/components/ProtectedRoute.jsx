import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAdminLoggedIn = localStorage.getItem("adminToken");

  return isAdminLoggedIn ? children : <Navigate to="/admin" />;
};

export default ProtectedRoute;
