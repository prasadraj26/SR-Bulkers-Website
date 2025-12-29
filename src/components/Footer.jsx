import { motion } from 'framer-motion'
import { 
  FaTruck, FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, 
  FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram,
  FaDirections, FaExternalLinkAlt, FaCopy
} from 'react-icons/fa'
import './Footer.css'

const Footer = () => {
  // Your company address
  const companyInfo = {
    name: "Truck Builders Company",
    description: "Leading truck body manufacturers with over 20 years of expertise in custom truck solutions, quality fabrication, and reliable service.",
    address: {
      plusCode: "PQPH+GG",
      area: "Navappatti",
      district: "Dindigul District",
      state: "Tamil Nadu",
      pincode: "636452",
      country: "India"
    },
    contact: {
      phone: "+91 12345 67890",
      email: "info@truckbuilders.com",
      hours: {
        weekdays: "Mon-Fri: 8:00 AM - 6:00 PM",
        saturday: "Saturday: 9:00 AM - 2:00 PM",
        sunday: "Sunday: Closed"
      }
    },
    social: [
      { icon: FaFacebookF, link: "#", label: "Facebook" },
      { icon: FaTwitter, link: "#", label: "Twitter" },
      { icon: FaLinkedinIn, link: "#", label: "LinkedIn" },
      { icon: FaInstagram, link: "#", label: "Instagram" }
    ]
  }

  const quickLinks = ['Home', 'About Us', 'Services', 'Products', 'Gallery', 'Contact']
  const servicesList = ['Custom Truck Bodies', 'Trailer Manufacturing', 'Truck Repair', 'Painting Services', 'Hydraulic Systems', 'Container Bodies']

  const copyAddress = () => {
    const fullAddress = `${companyInfo.address.plusCode}, ${companyInfo.address.area}, ${companyInfo.address.district}, ${companyInfo.address.state} ${companyInfo.address.pincode}, ${companyInfo.address.country}`
    navigator.clipboard.writeText(fullAddress)
      .then(() => alert('Address copied to clipboard!'))
      .catch(err => console.error('Failed to copy: ', err))
  }

  const openGoogleMaps = () => {
    const address = encodeURIComponent(
      `${companyInfo.address.area}, ${companyInfo.address.district}, ${companyInfo.address.state} ${companyInfo.address.pincode}`
    )
    window.open(`https://www.google.com/maps/search/?api=1&query=${address}`, '_blank')
  }

  const openDirections = () => {
    const address = encodeURIComponent(
      `${companyInfo.address.area}, ${companyInfo.address.district}, ${companyInfo.address.state} ${companyInfo.address.pincode}`
    )
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${address}`, '_blank')
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Company Info Column */}
          <motion.div 
            className="footer-column"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className="footer-logo">
              <FaTruck className="logo-icon" />
              <span className="logo-text">Truck Builders</span>
            </div>
            <p className="company-description">
              {companyInfo.description}
            </p>
            <div className="social-links">
              {companyInfo.social.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.link}
                  className="social-link"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.label}
                >
                  <social.icon />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links Column */}
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
                  className="footer-link-item"
                  whileHover={{ x: 5 }}
                >
                  <a 
                    href={`#${link.toLowerCase().replace(' ', '')}`}
                    className="footer-link"
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

          {/* Services Column */}
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
                  className="footer-link-item"
                  whileHover={{ x: 5 }}
                >
                  <a href="#" className="footer-link">
                    {service}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Location Square Column */}
          <motion.div 
            className="footer-column"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <div className="location-square">
              <div className="location-header">
                <h3 className="location-title">
                  <FaMapMarkerAlt style={{ color: 'var(--accent-color)' }} />
                  Our Location
                </h3>
                <p className="location-subtitle">
                  Visit our factory and showroom
                </p>
              </div>
              
              <div className="address-container">
                <div className="address-line">
                  <div className="address-icon">
                    <FaMapMarkerAlt />
                  </div>
                  <div className="address-text">
                    <strong>Plus Code:</strong> {companyInfo.address.plusCode}<br />
                    <strong>Area:</strong> {companyInfo.address.area}<br />
                    <strong>District:</strong> {companyInfo.address.district}<br />
                    <strong>State:</strong> {companyInfo.address.state}<br />
                    <strong>Pincode:</strong> {companyInfo.address.pincode}<br />
                    <strong>Country:</strong> {companyInfo.address.country}
                  </div>
                </div>
                
                <div className="address-line">
                  <div className="address-icon">
                    <FaPhone />
                  </div>
                  <div className="address-text">
                    <strong>Phone:</strong> {companyInfo.contact.phone}
                  </div>
                </div>
                
                <div className="address-line">
                  <div className="address-icon">
                    <FaEnvelope />
                  </div>
                  <div className="address-text">
                    <strong>Email:</strong> {companyInfo.contact.email}
                  </div>
                </div>
                
                <div className="address-line">
                  <div className="address-icon">
                    <FaClock />
                  </div>
                  <div className="address-text">
                    <strong>Hours:</strong> {companyInfo.contact.hours.weekdays}
                  </div>
                </div>
              </div>
              
              <div className="location-actions">
                <motion.button
                  className="map-btn"
                  onClick={openGoogleMaps}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Open in Google Maps"
                >
                  <FaExternalLinkAlt /> Google Maps
                </motion.button>
                
                <motion.button
                  className="map-btn"
                  onClick={openDirections}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Get Directions"
                >
                  <FaDirections /> Directions
                </motion.button>
                
                <motion.button
                  className="map-btn copy-btn"
                  onClick={copyAddress}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Copy Address to Clipboard"
                >
                  <FaCopy /> Copy Address
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="footer-bottom"
          data-aos="fade-up"
          data-aos-delay="500"
        >
          <p>© {new Date().getFullYear()} {companyInfo.name}. All Rights Reserved.</p>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer