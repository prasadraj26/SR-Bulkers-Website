import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { FiMenu, FiX } from 'react-icons/fi'
import { FaWhatsapp, FaPhone } from 'react-icons/fa'
import './Navbar.css'
import logo from '../assets/images/logo.jpg'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setIsOpen(false)
  }

  const scrollToSection = (id) => {
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      }, 300)
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
    setIsOpen(false)
  }

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        
        {/* LOGO */}
        <div className="logo" onClick={scrollToTop}>
          <img src={logo} alt="SR Bulkers" className="logo-image" />
        </div>

        {/* DESKTOP LINKS */}
        <div className="nav-links">
          <span className="nav-link" onClick={scrollToTop}>Home</span>
          <span className="nav-link" onClick={() => navigate('/about')}>About</span>
          <span className="nav-link" onClick={() => navigate('/services')}>Services</span>
          <span className="nav-link" onClick={() => scrollToSection('products')}>Products</span>
          <span className="nav-link" onClick={() => navigate('/gallery')}>Gallery</span>
          <span className="nav-link" onClick={() => scrollToSection('contact')}>Contact</span>
        </div>

        {/* ACTION ICONS */}
        <div className="nav-actions">
          <a href="https://wa.me/91XXXXXXXXXX" target="_blank" rel="noreferrer" className="icon-btn whatsapp">
            <FaWhatsapp />
          </a>
          <a href="tel:+91XXXXXXXXXX" className="icon-btn call">
            <FaPhone />
          </a>
          <button className="menu-toggle" onClick={() => setIsOpen(true)}>
            <FiMenu />
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <>
          <div className="overlay" onClick={() => setIsOpen(false)} />
          <div className="mobile-menu">
            <button className="close-menu" onClick={() => setIsOpen(false)}>
              <FiX />
            </button>

            <span onClick={scrollToTop}>Home</span>
            <span onClick={() => navigate('/about')}>About</span>
            <span onClick={() => navigate('/services')}>Services</span>
            <span onClick={() => scrollToSection('products')}>Products</span>
            <span onClick={() => navigate('/gallery')}>Gallery</span>
            <span onClick={() => scrollToSection('contact')}>Contact</span>
          </div>
        </>
      )}
    </nav>
  )
}

export default Navbar
