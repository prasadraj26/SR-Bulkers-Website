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
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 6; // Perfect 3x2 grid per page

  /* 🔥 Initialize AOS */
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
      offset: 100
    });
    
    // Refresh AOS when images load or page changes
    setTimeout(() => {
      AOS.refresh();
    }, 100);
  }, [images, currentPage]);

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

  // Calculate pagination
  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = images.slice(indexOfFirstImage, indexOfLastImage);
  const totalPages = Math.ceil(images.length / imagesPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  return (
    <>
      <Navbar />

      <main className="gallery-page">
        <div className="gallery-container">
          {/* TITLE WITH ANIMATION */}
          <div className="gallery-title-wrapper" data-aos="gallery-fade-down" data-aos-delay="100">
            <h2 className="gallery-title">
              OUR <span>GALLERY</span>
            </h2>
            
            {/* Show total images count */}
            {!loading && !error && images.length > 0 && (
              <p className="gallery-subtitle" data-aos="fade-up" data-aos-delay="200">
                Showing {currentImages.length} of {images.length} images
              </p>
            )}
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

          {/* GALLERY GRID WITH PERFECT AUTO-ADJUSTMENT */}
          {!loading && !error && images.length > 0 && (
            <>
              <div 
                className="gallery-grid"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                {currentImages.map((img, index) => {
                  // Calculate delay for staggered animation
                  const animationDelay = (index % 4) * 100;
                  
                  return (
                    <div 
                      className="gallery-card stagger-item" 
                      key={img.fileId}
                      data-aos="zoom-in"
                      data-aos-delay={animationDelay}
                      data-aos-duration="600"
                    >
                      <img
                        src={img.imageUrl}
                        alt={img.fileName || "Gallery Image"}
                        loading="lazy"
                      />
                    </div>
                  );
                })}
              </div>

              {/* PAGINATION CONTROLS - Only show if more than 1 page */}
              {totalPages > 1 && (
                <div className="gallery-pagination" data-aos="fade-up" data-aos-delay="300">
                  {/* Previous Button */}
                  <button
                    className="page-btn"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    aria-label="Previous page"
                  >
                    &laquo;
                  </button>

                  {/* Page Numbers */}
                  {[...Array(totalPages)].map((_, index) => {
                    const pageNumber = index + 1;
                    // Show first 3 pages, last 3 pages, and pages around current
                    if (
                      pageNumber <= 3 ||
                      pageNumber > totalPages - 3 ||
                      (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={pageNumber}
                          className={`page-btn ${currentPage === pageNumber ? 'active' : ''}`}
                          onClick={() => handlePageChange(pageNumber)}
                          aria-label={`Page ${pageNumber}`}
                          aria-current={currentPage === pageNumber ? 'page' : undefined}
                        >
                          {pageNumber}
                        </button>
                      );
                    } else if (
                      pageNumber === 4 && currentPage > 4 ||
                      pageNumber === totalPages - 4 && currentPage < totalPages - 3
                    ) {
                      return <span key={`dots-${pageNumber}`} className="page-dots">...</span>;
                    }
                    return null;
                  })}

                  {/* Next Button */}
                  <button
                    className="page-btn"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    aria-label="Next page"
                  >
                    &raquo;
                  </button>
                </div>
              )}

              {/* Page info */}
              {totalPages > 1 && (
                <div className="page-info" data-aos="fade-up" data-aos-delay="350" style={{textAlign: 'center', color: '#666', fontSize: '0.9rem', marginBottom: '20px'}}>
                  Page {currentPage} of {totalPages}
                </div>
              )}
            </>
          )}

        </div>
      </main>

      <Footer />
    </>
  );
};

export default GalleryPage;