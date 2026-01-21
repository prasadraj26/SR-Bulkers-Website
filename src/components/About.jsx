import {
  FaArrowRight,
  FaIndustry,
  FaTools,
  FaTruck,
  FaHandshake
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // ADD THIS IMPORT
import "./About.css";

const About = () => {
  const navigate = useNavigate();

  // Animation variants for scroll effect
  const titleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.2
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 0.4
      }
    }
  };

  const cardContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="about" className="about-section">
      <div className="about-container">
        {/* HEADER WITH SCROLL ANIMATION */}
        <motion.div 
          className="section-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2 
            className="about-title"
            variants={titleVariants}
          >
            WELCOME
          </motion.h2>

          <motion.p 
            className="section-subtitle"
            variants={subtitleVariants}
          >
            SR Bulkers is a trusted manufacturer of cement bulkers and trailers,
            established in 2012 at Mettur, Tamil Nadu. With over 12 years of
            experience, we focus on strong build quality, safety, and long
            service life.
          </motion.p>

          <motion.div 
            className="about-read-more"
            variants={buttonVariants}
          >
            <motion.button
              className="tech-button"
              onClick={() => navigate("/about")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Read More
              <FaArrowRight className="button-icon" />
            </motion.button>
          </motion.div>
        </motion.div>

        <div className="about-divider"></div>

        {/* WHY CHOOSE US WITH SCROLL ANIMATION */}
        <motion.div 
          className="why-choose-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h3 
            className="why-title"
            variants={titleVariants}
          >
            Why Choose Us
          </motion.h3>

          <motion.div 
            className="why-grid"
            variants={cardContainerVariants}
          >
            <motion.div 
              className="why-card"
              variants={cardVariants}
              whileHover={{ y: -5 }}
            >
              <FaIndustry className="why-icon" />
              <h4>12+ Years Experience</h4>
              <p>Proven manufacturing expertise</p>
            </motion.div>

            <motion.div 
              className="why-card"
              variants={cardVariants}
              whileHover={{ y: -5 }}
            >
              <FaTools className="why-icon" />
              <h4>Strong Build Quality</h4>
              <p>Designed for Indian roads</p>
            </motion.div>

            <motion.div 
              className="why-card"
              variants={cardVariants}
              whileHover={{ y: -5 }}
            >
              <FaTruck className="why-icon" />
              <h4>On-Time Delivery</h4>
              <p>Committed timelines</p>
            </motion.div>

            <motion.div 
              className="why-card"
              variants={cardVariants}
              whileHover={{ y: -5 }}
            >
              <FaHandshake className="why-icon" />
              <h4>After-Sales Support</h4>
              <p>Support after delivery</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;