import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AOS from "aos";
import "aos/dist/aos.css";
import "./GalleryPage.css";

const GalleryPage = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* 🔥 Initialize AOS */
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
      offset: 100
    });
    
    // Refresh AOS when images load
    AOS.refresh();
  }, [images]);

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
          {/* TITLE WITH ANIMATION */}
          <div className="gallery-title-wrapper" data-aos="gallery-fade-down" data-aos-delay="100">
            <h2 className="gallery-title">
              Our <span>Gallery</span>
            </h2>
            {/* 🔥 REMOVED UNDERLINE DIV */}
          </div>

          {/* STATES */}
          {loading && (
            <div className="loading-state" data-aos="fade-up">
              <div className="loading-spinner"></div>
              <p>Loading images...</p>
            </div>
          )}

          {!loading && error && (
            <div className="error-state" data-aos="fade-up">
              <p style={{ color: "red" }}>Error: {error}</p>
            </div>
          )}

          {!loading && !error && images.length === 0 && (
            <div className="empty-state" data-aos="fade-up">
              <p>No images in the gallery yet.</p>
            </div>
          )}

          {!loading && !error && images.length > 0 && (
            <div className="gallery-grid">
              {images.map((img, index) => (
                <div 
                  className="gallery-card stagger-item" 
                  key={img.fileId}
                  data-aos="fade-up"
                  data-aos-delay={`${(index % 4) * 100}`} // Stagger animation
                  data-aos-duration="600"
                >
                  <img
                    src={img.imageUrl}
                    alt={img.fileName || "Gallery Image"}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          )}

          {/* BACK BUTTON WITH ANIMATION */}
          <div className="gallery-back-wrapper" data-aos="fade-up" data-aos-delay="300">
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