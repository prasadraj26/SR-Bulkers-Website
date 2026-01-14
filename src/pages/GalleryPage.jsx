import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import "./GalleryPage.css";

const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycby_ZkW1SctI4LPhoe3MuCBaWuuJw_iM23tNPhGejIrK8sr9rP04pEeKimAKD1rPJsU7/exec";

const GalleryPage = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch(APPS_SCRIPT_URL)
      .then(res => res.json())
      .then(data => setImages(data));
  }, []);

  return (
    <>
      {/* ===== GALLERY CONTENT ===== */}
      <main className="gallery-page">

        {/* TITLE */}
        <div className="gallery-title-wrapper">
          <h2 className="gallery-title">
            Our <span>Gallery</span>
          </h2>
          <div className="gallery-underline"></div>
        </div>

        {/* IMAGE GRID */}
        <div className="gallery-grid">
          {images.map((img, index) => (
            <div className="gallery-card" key={index}>
              <img
                src={img.imageUrl}
                alt={img.fileName || "Gallery Image"}
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* BACK BUTTON — BOTTOM CENTER */}
        <div className="gallery-back-wrapper">
          <button
            className="back-btn"
            onClick={() => navigate(-1)}
          >
            ← Go Back
          </button>
        </div>

      </main>

      {/* ===== FOOTER (ALWAYS VISIBLE) ===== */}
      <Footer />
    </>
  );
};

export default GalleryPage;
