import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ref, onValue, remove } from "firebase/database";
import { db } from "../firebase";
import { uploadGalleryImage } from "../utils/uploadGalleryImage";
import "./ManageGallery.css";

function ManageGallery() {
  const navigate = useNavigate();

  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [message, setMessage] = useState("");
  const [initialLoading, setInitialLoading] = useState(true);

  /* FETCH IMAGES */
  useEffect(() => {
    const galleryRef = ref(db, "gallery");
    onValue(galleryRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.entries(data)
          .map(([id, value]) => ({ id, ...value }))
          .sort((a, b) => b.uploadedAtTimestamp - a.uploadedAtTimestamp);
        setImages(list);
      } else {
        setImages([]);
      }
      setInitialLoading(false);
    });
  }, []);

  /* UPLOAD IMAGE */
  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select an image");
      return;
    }

    setLoading(true);
    setMessage("");

    const result = await uploadGalleryImage(file);

    if (result.success) {
      setMessage("Image uploaded successfully");
      setFile(null);
      document.querySelector('input[type="file"]').value = "";
    } else {
      setMessage(result.error);
    }

    setLoading(false);
  };

  /* DELETE IMAGE */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this image?")) return;

    setDeletingId(id);

    try {
      await remove(ref(db, `gallery/${id}`));
      setMessage("Image deleted");
    } catch {
      setMessage("Delete failed");
    }

    setDeletingId(null);
  };

  return (
    <div className="manage-gallery">
      <h2>Manage Gallery</h2>

      {/* Upload */}
      <div className="gallery-upload">
        <label className={`file-picker ${file ? "selected" : ""}`}>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            disabled={loading}
          />
          {file ? "Image Selected" : "Choose Image"}
        </label>

        <button onClick={handleUpload} disabled={loading || !file}>
          {loading ? <span className="spinner"></span> : "Upload"}
        </button>
      </div>

      {/* Selected file info */}
      {file && (
        <div className="file-info">
          <span>{file.name}</span>
          <small>{Math.round(file.size / 1024)} KB</small>
        </div>
      )}

      {message && <p className="gallery-message">{message}</p>}

      {/* Gallery */}
      <div className="gallery-grid">
        {initialLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="gallery-skeleton"></div>
          ))
        ) : images.length === 0 ? (
          <p className="empty-text">No images uploaded yet.</p>
        ) : (
          images.map((img) => (
            <div key={img.id} className="gallery-card fade-in">
              <img
                src={img.imageUrl}
                alt={img.fileName}
                loading="lazy"
              />
              <button
                className="gallery-delete-btn"
                onClick={() => handleDelete(img.id)}
                disabled={deletingId === img.id}
              >
                {deletingId === img.id ? "Deleting..." : "Delete"}
              </button>
            </div>
          ))
        )}
      </div>

      {/* Back */}
      <div className="about-back-wrapper">
        <button
          className="about-back-btn"
          onClick={() => navigate("/admin/dashboard")}
        >
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default ManageGallery;
