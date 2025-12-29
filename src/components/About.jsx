import { motion } from 'framer-motion'
import { FaCheckCircle, FaIndustry, FaUsers, FaAward } from 'react-icons/fa'
import './About.css'

const About = () => {
  const features = [
    { icon: <FaIndustry />, text: 'Custom truck body builders' },
    { icon: <FaCheckCircle />, text: 'Quality steel fabrication' },
    { icon: <FaUsers />, text: 'Skilled workforce' },
    { icon: <FaAward />, text: 'Trusted by logistics & transport companies' }
  ]

  return (
    <section id="about" className="white-section about-section">

      <div className="container">
        <div className="about-content">
          <motion.div 
            className="about-text"
            data-aos="fade-right"
            data-aos-delay="200"
          >
            <h2 className="section-title">About Us</h2>
            <p className="about-description">
              For over 20 years, Truck Builders Company has been at the forefront of custom truck body manufacturing. 
              We combine traditional craftsmanship with cutting-edge technology to deliver durable, reliable, 
              and high-performance truck bodies that withstand the toughest conditions.
            </p>
            
            <div className="features-list">
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  className="feature-item"
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="feature-icon">{feature.icon}</span>
                  <span>{feature.text}</span>
                </motion.div>
              ))}
            </div>
            
            <motion.button 
              className="btn btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
            >
              Get in Touch
            </motion.button>
          </motion.div>
          
          <motion.div 
            className="about-image"
            data-aos="fade-left"
            data-aos-delay="400"
          >
            <div className="image-placeholder">
              <span>Manufacturing Workshop Image</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About