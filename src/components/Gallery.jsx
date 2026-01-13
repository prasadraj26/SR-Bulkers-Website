import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "./Gallery.css";

const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycby_ZkW1SctI4LPhoe3MuCBaWuuJw_iM23tNPhGejIrK8sr9rP04pEeKimAKD1rPJsU7/exec";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Refs for carousel rows
  const topRowRef = useRef(null);
  const bottomRowRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

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

  /* ===== LIGHTBOX ===== */
  const openLightbox = (index) => {
    if (images[index]) {
      setSelectedImage(images[index]);
      setCurrentIndex(index);
    }
  };

  const closeLightbox = () => setSelectedImage(null);

  const nextImage = (e) => {
    e?.stopPropagation();
    if (images.length === 0) return;
    const next = (currentIndex + 1) % images.length;
    setSelectedImage(images[next]);
    setCurrentIndex(next);
  };

  const prevImage = (e) => {
    e?.stopPropagation();
    if (images.length === 0) return;
    const prev = (currentIndex - 1 + images.length) % images.length;
    setSelectedImage(images[prev]);
    setCurrentIndex(prev);
  };

  const handleCarouselClick = (index) => {
    if (carouselImages.length === 0) return;
    const originalIndex = index % carouselImages.length;
    const clickedImage = carouselImages[originalIndex];
    
    // Find in full images array
    const fullIndex = images.findIndex(img => img.id === clickedImage.id);
    if (fullIndex !== -1) openLightbox(fullIndex);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage) return;
      
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, currentIndex]);

  return (
    <section className="gallery-section">
      <div className="container">
        <h2 className="section-title">Latest Projects</h2>
        <p className="section-subtitle">
          Recently completed works and builds
        </p>

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
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div 
                className={`carousel-row top-row ${isHovered ? 'paused' : ''}`}
                ref={topRowRef}
              >
                {loopImages.map((img, idx) => (
                  <div
                    key={`top-${img.id}-${idx}`}
                    className="carousel-card"
                    onClick={() => handleCarouselClick(idx)}
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
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div 
                className={`carousel-row bottom-row ${isHovered ? 'paused' : ''}`}
                ref={bottomRowRef}
              >
                {loopImages.map((img, idx) => (
                  <div
                    key={`bottom-${img.id}-${idx}`}
                    className="carousel-card"
                    onClick={() => handleCarouselClick(idx)}
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

      {/* ===== LIGHTBOX ===== */}
      <AnimatePresence mode="wait">
        {selectedImage && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <motion.div
              className="lightbox-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="lightbox-image-container">
                <motion.img 
                  key={selectedImage.id}
                  src={selectedImage.imageUrl} 
                  alt={selectedImage.title}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
                
                {images.length > 1 && (
                  <>
                    <button 
                      className="nav prev-btn" 
                      onClick={prevImage}
                      aria-label="Previous image"
                    >
                      <FiChevronLeft size={32} />
                    </button>
                    <button 
                      className="nav next-btn" 
                      onClick={nextImage}
                      aria-label="Next image"
                    >
                      <FiChevronRight size={32} />
                    </button>
                  </>
                )}
              </div>
              
              <div className="lightbox-footer">
                <h3 className="lightbox-title">{selectedImage.title}</h3>
                <div className="lightbox-counter">
                  {currentIndex + 1} / {images.length}
                </div>
              </div>

              <button 
                className="close-btn" 
                onClick={closeLightbox}
                aria-label="Close lightbox"
              >
                <FiX size={24} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;