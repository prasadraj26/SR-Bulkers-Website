import { useEffect, useState } from "react";
import "./ManageGallery.css";

const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycby_ZkW1SctI4LPhoe3MuCBaWuuJw_iM23tNPhGejIrK8sr9rP04pEeKimAKD1rPJsU7/exec";

function ManageGallery() {
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [message, setMessage] = useState("");

  /* ===== Fetch Images ===== */
  const fetchImages = () => {
    fetch(APPS_SCRIPT_URL)
      .then((res) => res.json())
      .then((data) => {
        setImages(data.reverse());
      })
      .catch(() => {
        setMessage("Failed to load images");
      });
  };

  useEffect(() => {
    fetchImages();
  }, []);

  /* ===== Upload Image ===== */
  const uploadImage = () => {
    if (!file) return;

    setLoading(true);
    setMessage("");

    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        const base64 = reader.result.split(",")[1];
        const formData = new FormData();

        formData.append("image", base64);
        formData.append("fileName", file.name);
        formData.append("mimeType", file.type);

        const res = await fetch(APPS_SCRIPT_URL, {
          method: "POST",
          body: formData,
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

  /* ===== Delete Image ===== */
  const deleteImage = async (fileId) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;

    setDeletingId(fileId);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("action", "delete");
      formData.append("fileId", fileId);

      const res = await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        body: formData,
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

      {/* Message */}
      {message && <p className="gallery-message">{message}</p>}

      {/* Gallery Grid */}
      <div className="gallery-grid">
        {images.length === 0 ? (
          <p>No images uploaded yet.</p>
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
    </div>
  );
}

export default ManageGallery;
