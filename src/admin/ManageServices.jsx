import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { servicesApi } from '../utils/mockApi';
import './AdminDashboard.css'; // Reuse the CSS

function ManageServices() {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({ name: '', description: '' });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!localStorage.getItem('adminToken')) {
      navigate('/admin', { replace: true });
      return;
    }
    fetchServices();
  }, [navigate]);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const data = await servicesApi.getAll();
      setServices(data);
    } catch (err) {
      console.error('Error fetching services:', err);
      setError('Error fetching services');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.description.trim()) {
      setError('Name and description are required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      if (editingId) {
        await servicesApi.update(editingId, form);
      } else {
        await servicesApi.create(form);
      }
      setForm({ name: '', description: '' });
      setEditingId(null);
      fetchServices();
    } catch (err) {
      console.error('Error saving service:', err);
      setError('Error saving service');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (service) => {
    setForm({ name: service.name, description: service.description });
    setEditingId(service.id);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this service?')) return;

    try {
      await servicesApi.delete(id);
      fetchServices();
    } catch (err) {
      console.error('Error deleting service:', err);
      setError('Error deleting service');
    }
  };

  return (
    <div className="admin-dashboard-page">
      <header className="admin-dashboard-header">
        <div>
          <h1>Manage Services</h1>
          <p className="admin-dashboard-subtitle">Add, edit, and delete services</p>
        </div>
        <button className="admin-dashboard-logout" onClick={() => navigate('/admin/dashboard')}>
          Back to Dashboard
        </button>
      </header>

      <main className="admin-dashboard-main">
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-group">
            <label>Service Name:</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Description:</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              required
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Saving...' : editingId ? 'Update' : 'Add'} Service
          </button>
          {editingId && (
            <button type="button" onClick={() => { setEditingId(null); setForm({ name: '', description: '' }); }}>
              Cancel
            </button>
          )}
        </form>

        <div className="services-list">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service.id}>
                  <td>{service.name}</td>
                  <td>{service.description}</td>
                  <td>
                    <button onClick={() => handleEdit(service)}>Edit</button>
                    <button onClick={() => handleDelete(service.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default ManageServices;
