import { useState, useEffect, useRef } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase";
import "./Gallery.css";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Refs for carousel rows
  const topRowRef = useRef(null);
  const bottomRowRef = useRef(null);
  
  // Separate hover states for top and bottom rows
  const [isTopHovered, setIsTopHovered] = useState(false);
  const [isBottomHovered, setIsBottomHovered] = useState(false);

  /* ===== FETCH GALLERY FROM FIREBASE ===== */
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
              const normalized = Object.entries(data)
                .map(([key, img]) => ({
                  id: img.fileId || key,
                  imageUrl: img.imageUrl,
                  title: img.fileName || `Project`,
                  uploadedAt: img.uploadedAt,
                  uploadedAtTimestamp: img.uploadedAtTimestamp || 0,
                }))
                .filter(img => img.imageUrl && img.uploadedAt)
                .sort((a, b) => b.uploadedAtTimestamp - a.uploadedAtTimestamp);
              
              console.log("Gallery loaded:", normalized.length, "images");
              setImages(normalized);
            } else {
              console.log("No gallery images found");
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
      console.error("Gallery setup error:", error);
      setError(error.message);
      setImages([]);
      setLoading(false);
    }
  }, []);

  /* ===== LATEST 20 IMAGES ===== */
  const carouselImages = [...images].slice(0, Math.min(20, images.length));

  /* ===== ENSURE ENOUGH IMAGES FOR SEAMLESS LOOP ===== */
  const getLoopImages = (images) => {
    if (images.length === 0) return [];
    
    let loopImages = [];
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
        ) : error ? (
          <div className="error-state">
            <p style={{ color: 'red' }}>Error: {error}</p>
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
                      onError={(e) => {
                        console.error("Image failed to load:", img.imageUrl);
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* BOTTOM ROW - moves right */}
            <div 
              className="carousel-container"
              onMouseEnter={(e) => {
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
                      onError={(e) => {
                        console.error("Image failed to load:", img.imageUrl);
                        e.target.style.display = 'none';
                      }}
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