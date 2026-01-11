import { motion } from 'framer-motion'
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaDirections,
  FaCopy
} from 'react-icons/fa'
import './Footer.css'

const Footer = () => {
  const companyInfo = {
    name: "SR Bulkers",
    description:
      "Leading truck bulkers with over 12 years of expertise in custom truck solutions, quality fabrication, and reliable service.",
    address: {
      plusCode: "PQPH+GG",
      area: "Navappatti",
      district: "Salem",
      state: "Tamil Nadu",
      pincode: "636452",
      country: "India"
    },
    contact: {
      phone: "8098389303",
      email: "srbulkers@gmail.com",
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

  const quickLinks = ['Home', 'About', 'Services', 'Products', 'Contact']
  const servicesList = ['Custom Truck Bodies', 'Trailer Manufacturing', 'Truck Repair']

  const copyAddress = () => {
    const fullAddress = `${companyInfo.address.plusCode}, ${companyInfo.address.area}, ${companyInfo.address.district}, ${companyInfo.address.state} ${companyInfo.address.pincode}, ${companyInfo.address.country}`
    navigator.clipboard.writeText(fullAddress)
      .then(() => alert('Address copied to clipboard!'))
      .catch(err => console.error('Copy failed:', err))
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

          {/* COMPANY INFO */}
          <motion.div className="footer-column" data-aos="fade-up">
            <h3 className="logo-text">SR BULKERS</h3>
            <p className="company-description">{companyInfo.description}</p>

            <div className="social-links">
              {companyInfo.social.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.link}
                  className="social-link"
                  whileHover={{ scale: 1.1 }}
                  aria-label={social.label}
                >
                  <social.icon />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* QUICK LINKS */}
          <motion.div className="footer-column" data-aos="fade-up" data-aos-delay="100">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    onClick={(e) => {
                      e.preventDefault()
                      document.getElementById(link.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
                    }}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* SERVICES */}
          <motion.div className="footer-column" data-aos="fade-up" data-aos-delay="200">
            <h3>Our Services</h3>
            <ul className="footer-links">
              {servicesList.map((service, index) => (
                <li key={index}>{service}</li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
