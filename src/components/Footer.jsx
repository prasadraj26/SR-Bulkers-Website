import { motion } from 'framer-motion'
import { FaTruck, FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa'
import './Footer.css'

const Footer = () => {
  const quickLinks = ['Home', 'About Us', 'Services', 'Products', 'Gallery', 'Contact']
  const servicesList = ['Custom Truck Bodies', 'Trailer Manufacturing', 'Truck Repair', 'Painting Services', 'Hydraulic Systems', 'Container Bodies']

  return (
    <footer className="footer">

      <div className="container">
        <div className="footer-content">
          <motion.div 
            className="footer-column"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className="footer-logo">
              <FaTruck className="logo-icon" />
              <span className="logo-text">Truck Builders</span>
            </div>
            <p className="footer-description">
              Leading truck body manufacturers with over 20 years of expertise in custom truck solutions, quality fabrication, and reliable service.
            </p>
            <div className="social-links">
              {[FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className="social-icon"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={`Social Media ${index}`}
                >
                  <Icon />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="footer-column"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <h3>Quick Links</h3>
            <ul className="footer-links">
              {quickLinks.map((link, index) => (
                <motion.li 
                  key={index}
                  className="footer-link"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <a 
                    href={`#${link.toLowerCase().replace(' ', '')}`}
                    onClick={(e) => {
                      e.preventDefault()
                      document.getElementById(link.toLowerCase().replace(' ', ''))?.scrollIntoView({ behavior: 'smooth' })
                    }}
                  >
                    {link}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div 
            className="footer-column"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <h3>Our Services</h3>
            <ul className="footer-links">
              {servicesList.map((service, index) => (
                <motion.li 
                  key={index}
                  className="footer-link"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <a href="#">{service}</a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div 
            className="footer-column"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <h3>Contact Info</h3>
            <div className="contact-info">
              <div className="contact-item">
                <FaMapMarkerAlt className="contact-icon" />
                <p className="contact-text">123 Industrial Park, Manufacturing District, City 12345</p>
              </div>
              <div className="contact-item">
                <FaPhone className="contact-icon" />
                <p className="contact-text">+1 (555) 123-4567</p>
              </div>
              <div className="contact-item">
                <FaEnvelope className="contact-icon" />
                <p className="contact-text">info@truckbuilders.com</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="footer-bottom" data-aos="fade-up">
          <p>© {new Date().getFullYear()} Truck Builders Company. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer