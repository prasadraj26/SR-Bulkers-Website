import {
  FaArrowRight,
  FaTools,
  FaTruck,
  FaHandshake
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getCompanyExperience } from "../utils/companyExperience";
import logo from '../assets/images/logo.webp';
import "./About.css";

const About = () => {
  const navigate = useNavigate();

  const titleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.2 }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut", delay: 0.4 }
    }
  };

  const cardContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const countBoxVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section id="about" className="home-about-section">
      <div className="home-about-container">

        {/* ── HEADER ── */}
        <motion.div
          className="home-section-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* ── LOGO WITH FRAME ── */}
          <motion.div 
            className="home-logo-wrapper"
            variants={subtitleVariants}
          >
            <div className="home-logo-frame">
              <img 
                src={logo} 
                alt="SR Bulkers Logo" 
                className="home-company-logo"
              />
            </div>
          </motion.div>

          {/* ── ENGINEERING WORKS AND FABRICATORS TEXT ── */}
          <motion.div 
            className="home-engineering-text-wrapper"
            variants={subtitleVariants}
          >
            <span className="home-engineering-text">
              ENGINEERING WORKS AND FABRICATORS
            </span>
          </motion.div>


          <motion.p className="home-section-subtitle" variants={subtitleVariants}>
            SR Bulkers is a trusted manufacturer of cement bulkers and trailers,
            established in 2012 at Mettur, Tamil Nadu. With over {getCompanyExperience()} years of
            experience, we focus on strong build quality, safety, and long
            service life.
          </motion.p>

          {/* ── READ MORE BUTTON ── */}
          <motion.div className="home-read-more" variants={buttonVariants}>
            <motion.button className="home-tech-button" onClick={() => navigate("/about")}
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}>
              <span>Read More</span>
              <FaArrowRight className="home-button-icon" />
            </motion.button>
          </motion.div>

        </motion.div>

        {/* ── DIVIDER ── */}
        <div className="home-about-divider"></div>

        {/* ── STATS — WHY CHOOSE US ── */}
        <motion.div
          className="home-feature-wrapper"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h3 className="home-why-title" variants={titleVariants}>
            Why Choose Us
          </motion.h3>

          <motion.div
            className="home-feature-grid"
            variants={cardContainerVariants}
          >
            <motion.div
              className="home-feature-box"
              variants={countBoxVariants}
              whileHover={{ y: -5 }}
            >
              <div className="home-count-box">
                <span className="home-count-text">{getCompanyExperience()}</span><span>+</span>
              </div>
              <h6>Years of Experience</h6>
            </motion.div>

            <motion.div
              className="home-feature-box"
              variants={countBoxVariants}
              whileHover={{ y: -5 }}
            >
              <div className="home-count-box">
                <span className="home-count-text">1000</span><span>+</span>
              </div>
              <h6>Vehicle on Road</h6>
            </motion.div>

            <motion.div
              className="home-feature-box"
              variants={countBoxVariants}
              whileHover={{ y: -5 }}
            >
              <div className="home-count-box">
                <span className="home-count-text">1200</span><span>+</span>
              </div>
              <h6>Certified Suppliers</h6>
            </motion.div>

            <motion.div
              className="home-feature-box"
              variants={countBoxVariants}
              whileHover={{ y: -5 }}
            >
              <div className="home-count-box">
                <span className="home-count-text">100</span><span>+</span>
              </div>
              <h6>Prestigious Projects</h6>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ── WHAT WE PROVIDE ── */}
        <motion.div
          className="home-why-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h3 className="home-why-title" variants={titleVariants}>
            What We Provide
          </motion.h3>

          <motion.div className="home-why-grid" variants={cardContainerVariants}>

            <motion.div
              className="home-why-card"
              variants={cardVariants}
              whileHover={{ y: -5 }}
            >
              <FaTools className="home-why-icon" />
              <h4>Strong Build Quality</h4>
              <p>Designed for Indian roads</p>
            </motion.div>

            <motion.div
              className="home-why-card"
              variants={cardVariants}
              whileHover={{ y: -5 }}
            >
              <FaTruck className="home-why-icon" />
              <h4>On-Time Delivery</h4>
              <p>Committed timelines</p>
            </motion.div>

            <motion.div
              className="home-why-card"
              variants={cardVariants}
              whileHover={{ y: -5 }}
            >
              <FaHandshake className="home-why-icon" />
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