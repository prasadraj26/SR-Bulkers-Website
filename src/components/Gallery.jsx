import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { galleryApi } from '../utils/mockApi'
import './Gallery.css'

const Gallery = () => {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedImage, setSelectedImage] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const topRowRef = useRef(null)
  const bottomRowRef = useRef(null)

  useEffect(() => {
    fetchGallery()
  }, [])

  // Keep carousel animation running continuously; hover no longer pauses it
  useEffect(() => {
    const topRow = topRowRef.current
    const bottomRow = bottomRowRef.current
    if (topRow) topRow.style.animationPlayState = 'running'
    if (bottomRow) bottomRow.style.animationPlayState = 'running'
  }, [])

  const fetchGallery = async () => {
    try {
      const data = await galleryApi.getAll()
      setImages(data)
    } catch (err) {
      console.error('Error fetching gallery:', err)
      setError('Error loading gallery')
    } finally {
      setLoading(false)
    }
  }

  const openLightbox = (index) => {
    setSelectedImage(images[index])
    setCurrentIndex(index)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const nextImage = () => {
    const nextIndex = (currentIndex + 1) % images.length
    setSelectedImage(images[nextIndex])
    setCurrentIndex(nextIndex)
  }

  const prevImage = () => {
    const prevIndex = (currentIndex - 1 + images.length) % images.length
    setSelectedImage(images[prevIndex])
    setCurrentIndex(prevIndex)
  }

  const getCarouselImages = () => {
    if (images.length <= 5) return images
    return images.slice(0, Math.min(7, images.length))
  }

  const carouselImages = getCarouselImages()
  const duplicatedImages = [...carouselImages, ...carouselImages, ...carouselImages]

  // Create a map for faster lookups instead of using findIndex every click
  const carouselImageMap = new Map(carouselImages.map((img, idx) => [img.id, idx]))

  const handleCarouselImageClick = (idx) => {
    const originalIdx = idx % carouselImages.length
    const selectedImage = carouselImages[originalIdx]
    // Find the image in the full gallery directly
    const mainIdx = images.findIndex(img => img.id === selectedImage.id)
    if (mainIdx !== -1) {
      openLightbox(mainIdx)
    }
  }

  return (
    <section id="gallery" className="gallery-section">
      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <h2 className="section-title">Our Gallery</h2>
          <p className="section-subtitle">
            Witness the craftsmanship and precision that goes into every truck we build.
          </p>
        </div>

        {/* Carousel Section */}
        {!loading && !error && images.length > 0 && (
          <div className="carousel-container">
            <h3 className="featured-title">Featured Collections</h3>
            
            <div className="infinite-carousel">
              <div className="carousel-row-wrapper">
                <div 
                  ref={topRowRef}
                  className="carousel-row top-row"
                >
                  {duplicatedImages.map((image, idx) => (
                    <motion.div
                      key={`top-${idx}`}
                      className="carousel-image-wrapper"
                      whileHover={{ scale: 1.05 }}
                      onClick={() => handleCarouselImageClick(idx)}
                    >
                      <img
                        src={image.imageUrl}
                        alt={image.title}
                        className="carousel-image"
                        title={image.title}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="carousel-row-wrapper">
                <div 
                  ref={bottomRowRef}
                  className="carousel-row bottom-row"
                >
                  {duplicatedImages.map((image, idx) => (
                    <motion.div
                      key={`bottom-${idx}`}
                      className="carousel-image-wrapper"
                      whileHover={{ scale: 1.05 }}
                      onClick={() => handleCarouselImageClick(idx)}
                    >
                      <img
                        src={image.imageUrl}
                        alt={image.title}
                        className="carousel-image"
                        title={image.title}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {loading && <p className="loading-text">Loading gallery...</p>}
        {error && <p className="error">{error}</p>}
        
 

      </div>

      {/* Lightbox */}
      <AnimatePresence>
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
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img src={selectedImage.imageUrl} alt={selectedImage.title} className="lightbox-image" />
              
              <div className="lightbox-nav">
                <button className="nav-button" onClick={prevImage}>
                  <FiChevronLeft size={24} />
                </button>
                <button className="nav-button" onClick={nextImage}>
                  <FiChevronRight size={24} />
                </button>
              </div>
              
              <button className="close-button" onClick={closeLightbox}>
                <FiX size={20} />
              </button>
              
              <div className="lightbox-info">
                <h3>{selectedImage.title}</h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Gallery