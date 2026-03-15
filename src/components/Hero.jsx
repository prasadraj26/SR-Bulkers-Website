import { motion } from 'framer-motion'
import { FaArrowDown } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import './Hero.css'

import traillerTank from '../assets/images/trailler tank.png'
import sideImage from '../assets/images/side.png'
import bul2 from '../assets/images/bul2.png'

const carouselImages = [traillerTank, sideImage, bul2]

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const currentImage = carouselImages[currentImageIndex % carouselImages.length]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  return (
    <section id="home" className="hero-section">
      <div className="carousel-container">
        <motion.div
          className="carousel-image"
          key={currentImageIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
        >
          <img src={currentImage} alt="Hero background" className="carousel-image-img" />
          <div className="carousel-image-overlay" />
        </motion.div>

        <div className="carousel-indicators">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
              onClick={() => setCurrentImageIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <motion.div
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 className="hero-title" variants={itemVariants}>
          Manufacturing & Servicing of fly ash bulkers
        </motion.h1>
        
        <motion.p className="hero-subtitle" variants={itemVariants}>
          Custom truck bodies engineered for durability and performance. Over 12+ years of excellence in truck manufacturing.
        </motion.p>
        
        <motion.div className="hero-buttons" variants={itemVariants}>
          <button 
            className="btn btn-primary"
            onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}
          >
            View Services
          </button>
          <button 
            className="btn btn-secondary"
            onClick={() => document.getElementById('quote').scrollIntoView({ behavior: 'smooth' })}
          >
            Contact Us
          </button>
        </motion.div>
      </motion.div>

      <motion.div 
        className="scroll-down"
        onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <FaArrowDown />
      </motion.div>
    </section>
  )
}

export default Hero