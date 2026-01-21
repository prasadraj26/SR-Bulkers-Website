import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./GalleryPage.css";

const GalleryPage = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* 🔥 FORCE SCROLL TO TOP ON PAGE LOAD */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const dbRef = ref(db, "gallery");
    const unsubscribe = onValue(
      dbRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const imageArray = Object.entries(data)
            .map(([key, img]) => ({
              fileId: key,
              ...img,
            }))
            .filter((img) => img.imageUrl)
            .sort(
              (a, b) =>
                (b.uploadedAtTimestamp || 0) -
                (a.uploadedAtTimestamp || 0)
            );

          setImages(imageArray);
        } else {
          setImages([]);
        }
        setLoading(false);
      },
      (error) => {
        setError(error.message);
        setImages([]);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <>
      <Navbar />

      <main className="gallery-page">
        <div className="gallery-container">
          {/* TITLE */}
          <div className="gallery-title-wrapper">
            <h2 className="gallery-title">
              Our <span>Gallery</span>
            </h2>
            <div className="gallery-underline"></div>
          </div>

          {/* STATES */}
          {loading && (
            <div className="loading-state">
              <p>Loading images...</p>
            </div>
          )}

          {!loading && error && (
            <div className="error-state">
              <p style={{ color: "red" }}>Error: {error}</p>
            </div>
          )}

          {!loading && !error && images.length === 0 && (
            <div className="empty-state">
              <p>No images in the gallery yet.</p>
            </div>
          )}

          {!loading && !error && images.length > 0 && (
            <div className="gallery-grid">
              {images.map((img) => (
                <div className="gallery-card" key={img.fileId}>
                  <img
                    src={img.imageUrl}
                    alt={img.fileName || "Gallery Image"}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          )}

          {/* BACK */}
          <div className="gallery-back-wrapper">
            <button
              className="gallery-back-btn"
              onClick={() => navigate(-1)}
            >
              ← Go Back
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default GalleryPage;
