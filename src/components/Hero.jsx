// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { FaArrowDown } from 'react-icons/fa'
import './Hero.css'

const Hero = () => {
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

      <motion.div
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 className="hero-title" variants={itemVariants}>
          Heavy-Duty Builds for Heavy-Duty Work
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
            onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
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