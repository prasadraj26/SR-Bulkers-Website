import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import wheelImage from '../assets/images/wheel.png' // Uncomment when wheel.png is added
import './GoToTop.css'

const GoToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const wheelVariants = {
    hidden: { 
      opacity: 0,
      y: 100,
      rotate: -180,
      scale: 0.5
    },
    visible: { 
      opacity: 1,
      y: 0,
      rotate: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        bounce: 0.6
      }
    }
  }

  const innerWheelVariants = {
    hover: {
      rotate: 360,
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "linear"
      }
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="go-to-top"
          onClick={scrollToTop}
          variants={wheelVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          whileHover="hover"
          aria-label="Go to top"
        >
          <motion.img 
            src={wheelImage}
            alt="Wheel" 
            className="wheel-image"
            variants={innerWheelVariants}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default GoToTop