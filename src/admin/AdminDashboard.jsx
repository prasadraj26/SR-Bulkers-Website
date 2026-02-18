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
      {/* HEADER */}
      <header className="admin-dashboard-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Welcome, <strong>{adminEmail}</strong></p>
        </div>

        <button className="admin-logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </header>

      {/* DASHBOARD CONTENT */}
      <main className="admin-dashboard-main">
        <div className="admin-actions-grid">

          <div
            className="admin-action-card"
            onClick={() => navigate("/admin/manage-gallery")}
          >
            <h2>Manage Gallery</h2>
            <p>Upload & delete website gallery images</p>
          </div>

          {/* ✅ NEW MANAGE QUOTES CARD */}
          <div
            className="admin-action-card"
            onClick={() => navigate("/admin/manage-quotes")}
          >
            <h2>Manage Quotes</h2>
            <p>View, update & delete customer quote requests</p>
          </div>

          <div
            className="admin-action-card"
            onClick={() => navigate("/")}
          >
            <h2>Go to Website</h2>
            <p>Navigate to homepage</p>
          </div>

        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;