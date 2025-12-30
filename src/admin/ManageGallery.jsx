import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { galleryApi } from '../utils/mockApi';
import './AdminDashboard.css'; // Reuse the CSS for consistent styling

function ManageGallery() {
  const navigate = useNavigate();
  const [gallery, setGallery] = useState([]);
  const [form, setForm] = useState({ title: '', imageUrl: '', category: '' });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!localStorage.getItem('adminToken')) {
      navigate('/admin', { replace: true });
      return;
    }
    fetchGallery();
  }, [navigate]);

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const data = await galleryApi.getAll();
      setGallery(data);
    } catch (err) {
      console.error('Error fetching gallery:', err);
      setError('Error fetching gallery');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.imageUrl.trim() || !form.category.trim()) {
      setError('All fields are required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      if (editingId) {
        await galleryApi.update(editingId, form);
      } else {
        await galleryApi.create(form);
      }
      setForm({ title: '', imageUrl: '', category: '' });
      setEditingId(null);
      fetchGallery();
    } catch (err) {
      console.error('Error saving gallery item:', err);
      setError('Error saving gallery item');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setForm({ title: item.title, imageUrl: item.imageUrl, category: item.category });
    setEditingId(item.id);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      await galleryApi.delete(id);
      fetchGallery();
    } catch (err) {
      console.error('Error deleting gallery item:', err);
      setError('Error deleting gallery item');
    }
  };

  return (
    <div className="admin-dashboard-page">
      <header className="admin-dashboard-header">
        <div>
          <h1>Manage Gallery</h1>
          <p className="admin-dashboard-subtitle">Add, edit, and delete gallery items</p>
        </div>
        <button className="admin-dashboard-logout" onClick={() => navigate('/admin/dashboard')}>
          Back to Dashboard
        </button>
      </header>

      <main className="admin-dashboard-main">
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-group">
            <label>Title:</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Image URL:</label>
            <input
              type="url"
              value={form.imageUrl}
              onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
              placeholder="Enter image URL"
              required
            />
          </div>

          <div className="form-group">
            <label>Category:</label>
            <input
              type="text"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              placeholder="e.g., Fabrication, Workshop"
              required
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Saving...' : editingId ? 'Update' : 'Add'} Item
          </button>
          {editingId && (
            <button type="button" onClick={() => { setEditingId(null); setForm({ title: '', imageUrl: '', category: '' }); }}>
              Cancel
            </button>
          )}
        </form>

        <div className="gallery-grid">
          {gallery.map((item) => (
            <div key={item.id} className="gallery-item">
              <img src={item.imageUrl} alt={item.title} />
              <h3>{item.title}</h3>
              <p className="category">{item.category}</p>
              <div className="item-actions">
                <button onClick={() => handleEdit(item)}>Edit</button>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default ManageGallery;