import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css'; // Reuse the CSS for consistent styling

function ManageGallery() {
  const navigate = useNavigate();
  const [gallery, setGallery] = useState([]);
  const [form, setForm] = useState({ title: '', imageUrl: '', imageFile: null });
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
      const response = await fetch('/api/gallery');
      if (response.ok) {
        const data = await response.json();
        setGallery(data);
      } else {
        setError('Failed to fetch gallery');
      }
    } catch (err) {
      console.error('Error fetching gallery:', err);
      setError('Error fetching gallery');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setError('Title is required');
      return;
    }
    if (!form.imageUrl.trim() && !form.imageFile) {
      setError('Image URL or file is required');
      return;
    }

    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('title', form.title);
    if (form.imageFile) {
      formData.append('image', form.imageFile);
    } else {
      formData.append('imageUrl', form.imageUrl);
    }

    try {
      const url = editingId ? `/api/gallery/${editingId}` : '/api/gallery';
      const method = editingId ? 'PUT' : 'POST';
      const response = await fetch(url, {
        method,
        body: formData,
      });

      if (response.ok) {
        setForm({ title: '', imageUrl: '', imageFile: null });
        setEditingId(null);
        fetchGallery();
      } else {
        setError('Failed to save gallery item');
      }
    } catch (err) {
      console.error('Error saving gallery item:', err);
      setError('Error saving gallery item');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setForm({ title: item.title, imageUrl: item.imageUrl || '', imageFile: null });
    setEditingId(item.id);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      const response = await fetch(`/api/gallery/${id}`, { method: 'DELETE' });
      if (response.ok) {
        fetchGallery();
      } else {
        setError('Failed to delete gallery item');
      }
    } catch (err) {
      console.error('Error deleting gallery item:', err);
      setError('Error deleting gallery item');
    }
  };

  const handleFileChange = (e) => {
    setForm({ ...form, imageFile: e.target.files[0], imageUrl: '' });
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
              onChange={(e) => setForm({ ...form, imageUrl: e.target.value, imageFile: null })}
              placeholder="Enter image URL"
            />
          </div>

          <div className="form-group">
            <label>Or Upload Image File:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Saving...' : editingId ? 'Update' : 'Add'} Item
          </button>
          {editingId && (
            <button type="button" onClick={() => { setEditingId(null); setForm({ title: '', imageUrl: '', imageFile: null }); }}>
              Cancel
            </button>
          )}
        </form>

        <div className="gallery-grid">
          {gallery.map((item) => (
            <div key={item.id} className="gallery-item">
              <img src={item.imageUrl} alt={item.title} />
              <h3>{item.title}</h3>
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