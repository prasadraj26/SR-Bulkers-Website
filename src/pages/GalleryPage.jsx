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

  useEffect(() => {
    setLoading(true);
    setError(null);

    try {
      const dbRef = ref(db, "gallery");
      const unsubscribe = onValue(
        dbRef,
        (snapshot) => {
          try {
            if (snapshot.exists()) {
              const data = snapshot.val();
              const imageArray = Object.entries(data)
                .map(([key, img]) => ({
                  fileId: key,
                  ...img,
                }))
                .filter(img => img.imageUrl)
                .sort((a, b) => (b.uploadedAtTimestamp || 0) - (a.uploadedAtTimestamp || 0));
              
              console.log("GalleryPage loaded:", imageArray.length, "images");
              setImages(imageArray);
            } else {
              console.log("No images found");
              setImages([]);
            }
            setLoading(false);
          } catch (err) {
            console.error("Data processing error:", err);
            setError("Failed to process images");
            setLoading(false);
          }
        },
        (error) => {
          console.error("Firebase error:", error);
          setError(error.message);
          setImages([]);
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } catch (error) {
      console.error("Gallery page setup error:", error);
      setError(error.message);
      setImages([]);
      setLoading(false);
    }
  }, []);

  return (
    <>
      {/* NAVBAR */}
      <Navbar />

      {/* PAGE CONTENT */}
      <main className="gallery-page">
        <div className="gallery-container">

          {/* TITLE */}
          <div className="gallery-title-wrapper">
            <h2 className="gallery-title">
              Our <span>Gallery</span>
            </h2>
            <div className="gallery-underline"></div>
          </div>

          {/* LOADING STATE */}
          {loading && (
            <div className="loading-state">
              <div className="loading-spinner"></div>
              <p>Loading images...</p>
            </div>
          )}

          {/* ERROR STATE */}
          {!loading && error && (
            <div className="error-state">
              <p style={{ color: 'red' }}>Error: {error}</p>
            </div>
          )}

          {/* EMPTY STATE */}
          {!loading && !error && images.length === 0 && (
            <div className="empty-state">
              <p>No images in the gallery yet.</p>
            </div>
          )}

          {/* IMAGE GRID */}
          {!loading && !error && images.length > 0 && (
            <div className="gallery-grid">
              {images.map((img) => (
                <div className="gallery-card" key={img.fileId}>
                  <img
                    src={img.imageUrl}
                    alt={img.fileName || "Gallery Image"}
                    loading="lazy"
                    onError={(e) => {
                      console.error("Image failed to load:", img.imageUrl);
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              ))}
            </div>
          )}

          {/* BACK BUTTON */}
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

      {/* FOOTER */}
      <Footer />
    </>
  );
};

export default GalleryPage;
