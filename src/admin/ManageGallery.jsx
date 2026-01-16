import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ManageGallery.css";

const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycby_ZkW1SctI4LPhoe3MuCBaWuuJw_iM23tNPhGejIrK8sr9rP04pEeKimAKD1rPJsU7/exec";

function ManageGallery() {
  const navigate = useNavigate();

  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [message, setMessage] = useState("");

  const fetchImages = () => {
    fetch(APPS_SCRIPT_URL)
      .then((res) => res.json())
      .then((data) => setImages(data.reverse()))
      .catch(() => setMessage("Failed to load images"));
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const uploadImage = () => {
    if (!file) return;
    setLoading(true);
    setMessage("");

    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        const base64 = reader.result.split(",")[1];

        const res = await fetch(APPS_SCRIPT_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            image: base64,
            fileName: file.name,
            mimeType: file.type,
          }),
        });

        const data = await res.json();
        if (!data.success) throw new Error();

        setMessage("Image uploaded successfully");
        setFile(null);
        fetchImages();
      } catch {
        setMessage("Upload failed");
      } finally {
        setLoading(false);
      }
    };

    reader.readAsDataURL(file);
  };

  const deleteImage = async (fileId) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;

    setDeletingId(fileId);

    try {
      const res = await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete", fileId }),
      });

      const data = await res.json();
      if (!data.success) throw new Error();

      setImages((prev) => prev.filter((img) => img.fileId !== fileId));
      setMessage("Image deleted successfully");
    } catch {
      setMessage("Delete failed");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="manage-gallery">
      <h2>Manage Gallery</h2>

      {/* Upload Section */}
      <div className="gallery-upload">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button onClick={uploadImage} disabled={loading || !file}>
          {loading ? "Uploading..." : "Upload"}
        </button>
      </div>

      {message && <p className="gallery-message">{message}</p>}

      {/* Gallery Grid */}
      <div className="gallery-grid">
        {images.length === 0 ? (
          <p className="empty-text">No images uploaded yet.</p>
        ) : (
          images.map((img) => (
            <div
              key={img.fileId}
              className={`gallery-card ${
                deletingId === img.fileId ? "deleting" : ""
              }`}
            >
              <img src={img.imageUrl} alt={img.fileName} />
              <button
                className="gallery-delete-btn"
                onClick={() => deleteImage(img.fileId)}
                disabled={deletingId === img.fileId}
              >
                {deletingId === img.fileId ? "Deleting..." : "Delete"}
              </button>
            </div>
          ))
        )}
      </div>

      {/* BACK BUTTON (CENTERED – SAME AS ABOUT PAGE) */}
      <div className="about-back-wrapper">
        <button
          className="about-back-btn"
          onClick={() => navigate("/admin/dashboard")}
        >
          ←Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default ManageGallery;
