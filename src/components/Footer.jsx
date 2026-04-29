import { motion } from 'framer-motion'
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram
} from 'react-icons/fa'
import { useNavigate } from "react-router-dom";
import './Footer.css'

const Footer = () => {
  const navigate = useNavigate();

  const quickLinks = ['home', 'about', 'services', 'products', 'quote']

  // ✅ FINAL SMART NAVIGATION
  const handleNavigation = (link) => {
    // 👉 Services is a separate page
    if (link === "services") {
      navigate("/services");
      return;
    }

    // 👉 Other sections → Home scroll
    navigate("/", { state: { scrollTo: link } });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">

          {/* COMPANY */}
          <motion.div className="footer-column">
            <h3 className="logo-text">SR BULKERS</h3>
            <p className="company-description">
  Leading truck bulkers manufacturer with over 13 years of expertise in custom truck solutions,
  quality fabrication, and reliable service.
</p>
          </motion.div>

          {/* QUICK LINKS */}
          <motion.div className="footer-column">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigation(link);
                    }}
                  >
                    {link.charAt(0).toUpperCase() + link.slice(1)}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* SERVICES */}
          <motion.div className="footer-column">
            <h3>Our Services</h3>
            <ul className="footer-links">
              <li>Custom Truck Bulkers</li>
              <li>FC Painting</li>
              <li>Trailer Manufacturing</li>
              <li>Silo Manufacturing</li>
            </ul>
          </motion.div>

        </div>
      </div>
    </footer>
  )
}

export default Footer