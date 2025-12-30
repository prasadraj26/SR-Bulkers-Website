import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();
  const adminUser = localStorage.getItem("adminUser") || "Admin";
  const [stats, setStats] = useState({ gallery: 0, services: 0, visitors: 0 });

  useEffect(() => {
    if (!localStorage.getItem("adminToken")) {
      navigate("/admin", { replace: true });
    } else {
      // Load stats from localStorage
      const gallery = JSON.parse(localStorage.getItem('gallery') || '[]');
      const services = JSON.parse(localStorage.getItem('services') || '[]');
      setStats({
        gallery: gallery.length,
        services: services.length,
        visitors: 1250 // Mock visitor count
      });
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
        <div className="stats-grid">
          <div className="stat-card">
            <h3>{stats.gallery}</h3>
            <p>Gallery Items</p>
          </div>
          <div className="stat-card">
            <h3>{stats.services}</h3>
            <p>Services</p>
          </div>
          <div className="stat-card">
            <h3>{stats.visitors}</h3>
            <p>Total Visitors</p>
          </div>
        </div>

        <div className="admin-dashboard-grid">
          <div className="admin-dashboard-card">
            <h2>Manage Gallery</h2>
            <p>Add, edit, and delete gallery images</p>
            <button onClick={() => navigate('/admin/manage-gallery')}>Go to Gallery</button>
          </div>
          <div className="admin-dashboard-card">
            <h2>Manage Services</h2>
            <p>Add, edit, and delete services</p>
            <button onClick={() => navigate('/admin/manage-services')}>Go to Services</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;