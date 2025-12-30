import { useState } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import './Gallery.css'

const Gallery = () => {
  const images = [
    { id: 1, title: 'Custom Truck Body Fabrication', category: 'Fabrication' },
    { id: 2, title: 'Welding Workshop', category: 'Workshop' },
    { id: 3, title: 'Finished Truck Delivery', category: 'Delivery' },
    { id: 4, title: 'Quality Inspection', category: 'Quality' },
    { id: 5, title: 'Paint Booth Operations', category: 'Painting' },
    { id: 6, title: 'Assembly Line', category: 'Assembly' },
    { id: 7, title: 'Hydraulic System Installation', category: 'Hydraulics' },
    { id: 8, title: 'Custom Trailer Manufacturing', category: 'Trailers' }
  ]

  const [selectedImage, setSelectedImage] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)

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

  return (
    <section id="gallery" className="dark-section gallery-section">

      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <h2 className="section-title">Our Gallery</h2>
          <p className="section-subtitle">
            Witness the craftsmanship and precision that goes into every truck we build.
          </p>
        </div>

        <div className="gallery-grid">
          {images.map((image, index) => (
            <motion.div
              key={image.id}
              className="gallery-item"
              data-aos="zoom-in"
              data-aos-delay={index * 100}
              whileHover={{ scale: 1.05 }}
              onClick={() => openLightbox(index)}
            >
              <div className="gallery-image"></div>
              <div className="image-overlay">
                <h3 className="image-title">{image.title}</h3>
                <span className="image-category">{image.category}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

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
              <div className="lightbox-image"></div>
              
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
                <p>{selectedImage.category}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Gallery