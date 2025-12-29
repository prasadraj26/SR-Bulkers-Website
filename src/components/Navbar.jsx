import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX } from 'react-icons/fi'
import { FaTruck } from 'react-icons/fa'
import './Navbar.css'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const navItems = ['Home', 'About', 'Services', 'Products', 'Gallery', 'Contact']

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId.toLowerCase())
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsOpen(false)
    }
  }

  const navbarVariants = {
    hidden: { y: -100 },
    visible: { y: 0 }
  }

  const menuVariants = {
    closed: { opacity: 0, x: '100%' },
    open: { opacity: 1, x: 0 }
  }

  return (
    <motion.nav
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial="hidden"
      animate="visible"
      variants={navbarVariants}
      transition={{ duration: 0.5 }}
    >
      <div className="container nav-container">
        <div className="logo" onClick={() => scrollToSection('home')}>
          <FaTruck className="logo-icon" />
          <span className="logo-text">Truck Builders</span>
        </div>

        <div className="nav-links">
          {navItems.map((item) => (
            <a
              key={item}
              className="nav-link"
              onClick={() => scrollToSection(item)}
              style={{ cursor: 'pointer' }}
            >
              {item}
            </a>
          ))}
        </div>

        <button className="menu-toggle" onClick={() => setIsOpen(true)}>
          <FiMenu />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              className="mobile-menu"
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              transition={{ duration: 0.3 }}
            >
              <button className="close-menu" onClick={() => setIsOpen(false)}>
                <FiX />
              </button>
              {navItems.map((item) => (
                <a
                  key={item}
                  className="mobile-nav-link"
                  onClick={() => scrollToSection(item)}
                  style={{ cursor: 'pointer' }}
                >
                  {item}
                </a>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar