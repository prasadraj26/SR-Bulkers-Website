import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import "./AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();
  const adminEmail = auth.currentUser?.email || "Admin";

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/admin", { replace: true });
  };

  return (
    <div className="admin-dashboard-page">
      <header className="admin-dashboard-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Welcome back, <strong>{adminEmail}</strong></p>
        </div>
        <button onClick={handleLogout}>Logout</button>
      </header>
    </div>
  );
}

export default AdminDashboard;
