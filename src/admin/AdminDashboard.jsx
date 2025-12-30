import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();
  const adminUser = localStorage.getItem("adminUser") || "Admin";

  useEffect(() => {
    if (!localStorage.getItem("adminToken")) {
      navigate("/admin", { replace: true });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    navigate("/admin", { replace: true });
  };

  return (
    <div className="admin-dashboard-page">
      <header className="admin-dashboard-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p className="admin-dashboard-subtitle">
            Welcome back, <strong>{adminUser}</strong>
          </p>
        </div>
        <button className="admin-dashboard-logout" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <main className="admin-dashboard-main">
        <div className="admin-dashboard-grid">
          <section className="admin-dashboard-card">
            <h2>Overview</h2>
            <p>Quick summary of your site content will appear here.</p>
          </section>
          <section className="admin-dashboard-card">
            <h2>Manage Content</h2>
            <button onClick={() => navigate('/admin/gallery')}>Manage Gallery</button>
            <button onClick={() => navigate('/admin/services')}>Manage Services</button>
          </section>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;