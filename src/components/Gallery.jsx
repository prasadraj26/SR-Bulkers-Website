import { useState, useEffect, useRef } from "react";
import "./Gallery.css";

const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycby_ZkW1SctI4LPhoe3MuCBaWuuJw_iM23tNPhGejIrK8sr9rP04pEeKimAKD1rPJsU7/exec";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Refs for carousel rows
  const topRowRef = useRef(null);
  const bottomRowRef = useRef(null);
  
  // Separate hover states for top and bottom rows
  const [isTopHovered, setIsTopHovered] = useState(false);
  const [isBottomHovered, setIsBottomHovered] = useState(false);

  /* ===== FETCH GALLERY ===== */
  useEffect(() => {
    fetch(APPS_SCRIPT_URL)
      .then(res => res.json())
      .then(data => {
        const normalized = data
          .filter(img => img.uploadedAt && img.imageUrl)
          .map((img, i) => ({
            id: img.fileId || `img-${i}-${Date.now()}`,
            imageUrl: img.imageUrl,
            title: img.fileName || `Project ${i + 1}`,
            uploadedAt: img.uploadedAt,
            originalIndex: i
          }));
        setImages(normalized);
      })
      .catch(error => {
        console.error("Error fetching gallery:", error);
        setImages([]);
      })
      .finally(() => setLoading(false));
  }, []);

  /* ===== LATEST 20 IMAGES ===== */
  const carouselImages = [...images]
    .sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt))
    .slice(0, Math.min(20, images.length));

  /* ===== ENSURE ENOUGH IMAGES FOR SEAMLESS LOOP ===== */
  const getLoopImages = (images) => {
    if (images.length === 0) return [];
    
    let loopImages = [];
    // We need enough duplicates to ensure seamless scrolling
    const minItemsNeeded = 40;
    const repeatCount = Math.ceil(minItemsNeeded / images.length);
    
    for (let i = 0; i < repeatCount; i++) {
      loopImages.push(...images);
    }
    
    return loopImages;
  };

  const loopImages = getLoopImages(carouselImages);

  return (
    <section className="gallery-section" id="projects">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">LATEST PROJECTS</h2>
          <p className="section-subtitle">
            Recently completed works and builds
          </p>
        </div>

        {loading ? (
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading gallery...</p>
          </div>
        ) : carouselImages.length === 0 ? (
          <div className="empty-state">
            <p>No images found in the gallery.</p>
          </div>
        ) : (
          <div className="carousel-wrapper">
            {/* TOP ROW - moves left */}
            <div 
              className="carousel-container"
              onMouseEnter={(e) => {
                // Only pause if not hovering an image directly
                if (e.target === e.currentTarget) {
                  setIsTopHovered(true);
                }
              }}
              onMouseLeave={() => setIsTopHovered(false)}
            >
              <div 
                className={`carousel-row top-row ${isTopHovered ? 'paused' : ''}`}
                ref={topRowRef}
              >
                {loopImages.map((img, idx) => (
                  <div
                    key={`top-${img.id}-${idx}`}
                    className="carousel-card"
                  >
                    <img 
                      src={img.imageUrl} 
                      alt={img.title}
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* BOTTOM ROW - moves right */}
            <div 
              className="carousel-container"
              onMouseEnter={(e) => {
                // Only pause if not hovering an image directly
                if (e.target === e.currentTarget) {
                  setIsBottomHovered(true);
                }
              }}
              onMouseLeave={() => setIsBottomHovered(false)}
            >
              <div 
                className={`carousel-row bottom-row ${isBottomHovered ? 'paused' : ''}`}
                ref={bottomRowRef}
              >
                {loopImages.map((img, idx) => (
                  <div
                    key={`bottom-${img.id}-${idx}`}
                    className="carousel-card"
                  >
                    <img 
                      src={img.imageUrl} 
                      alt={img.title}
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;