import { useState, useEffect, useRef } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase";
import "./Gallery.css";
import { motion } from "framer-motion";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Carousel refs
  const topRowRef = useRef(null);
  const bottomRowRef = useRef(null);

  // Hover states
  const [isTopHovered, setIsTopHovered] = useState(false);
  const [isBottomHovered, setIsBottomHovered] = useState(false);

  /* ===============================
     FETCH GALLERY FROM FIREBASE
  =============================== */
  useEffect(() => {
    setLoading(true);
    setError(null);

    try {
      const galleryRef = ref(db, "gallery");

      const unsubscribe = onValue(
        galleryRef,
        (snapshot) => {
          try {
            if (snapshot.exists()) {
              const data = snapshot.val();

              const normalized = Object.entries(data)
                .map(([key, img]) => {
                  // Proper timestamp handling
                  const timestamp =
                    Number(img.uploadedAtTimestamp) ||
                    new Date(img.uploadedAt).getTime() ||
                    0;

                  return {
                    id: img.fileId || key,
                    imageUrl: img.imageUrl || "",
                    title: img.fileName || "Project",
                    uploadedAt: img.uploadedAt || "",
                    uploadedAtTimestamp: timestamp,
                  };
                })

                // Remove invalid images
                .filter((img) => img.imageUrl)

                // Sort newest first
                .sort(
                  (a, b) =>
                    b.uploadedAtTimestamp - a.uploadedAtTimestamp
                );

              console.log("Sorted Images:", normalized);

              setImages(normalized);
            } else {
              console.log("No gallery images found");
              setImages([]);
            }

            setLoading(false);
          } catch (err) {
            console.error("Processing Error:", err);
            setError("Failed to process gallery images");
            setLoading(false);
          }
        },
        (firebaseError) => {
          console.error("Firebase Error:", firebaseError);
          setError(firebaseError.message);
          setImages([]);
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } catch (err) {
      console.error("Setup Error:", err);
      setError(err.message);
      setLoading(false);
    }
  }, []);

  /* ===============================
     GET ONLY LATEST 20 IMAGES
  =============================== */
  const carouselImages = images.slice(0, 20);

  /* ===============================
     CREATE LOOP FOR INFINITE SLIDER
  =============================== */
  const getLoopImages = (imgs) => {
    if (!imgs.length) return [];

    const minItemsNeeded = 40;
    const repeatCount = Math.ceil(minItemsNeeded / imgs.length);

    return Array(repeatCount)
      .fill(imgs)
      .flat();
  };

  const loopImages = getLoopImages(carouselImages);

  /* ===============================
     ANIMATION VARIANTS
  =============================== */
  const titleVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.2,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="gallery-section" id="projects">
      <div className="gallery-container">

        {/* HEADER */}
        <motion.div
          className="gallery-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2
            className="gallery-title"
            variants={titleVariants}
          >
            LATEST PROJECTS
          </motion.h2>

          <motion.p
            className="gallery-subtitle"
            variants={subtitleVariants}
          >
            Recently completed works and latest builds
          </motion.p>
        </motion.div>

        {/* LOADING */}
        {loading ? (
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading gallery...</p>
          </div>
        ) : error ? (
          <div className="error-state">
            <p style={{ color: "red" }}>
              Error: {error}
            </p>
          </div>
        ) : carouselImages.length === 0 ? (
          <div className="empty-state">
            <p>No images found in gallery.</p>
          </div>
        ) : (
          <div className="carousel-wrapper">

            {/* ================= TOP ROW ================= */}
            <div
              className="carousel-container"
              onMouseEnter={() => setIsTopHovered(true)}
              onMouseLeave={() => setIsTopHovered(false)}
            >
              <div
                className={`carousel-row top-row ${
                  isTopHovered ? "paused" : ""
                }`}
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
                        console.error(
                          "Image failed:",
                          img.imageUrl
                        );
                        e.target.style.display = "none";
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* ================= BOTTOM ROW ================= */}
            <div
              className="carousel-container"
              onMouseEnter={() => setIsBottomHovered(true)}
              onMouseLeave={() => setIsBottomHovered(false)}
            >
              <div
                className={`carousel-row bottom-row ${
                  isBottomHovered ? "paused" : ""
                }`}
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
                        console.error(
                          "Image failed:",
                          img.imageUrl
                        );
                        e.target.style.display = "none";
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