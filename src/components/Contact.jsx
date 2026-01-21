import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa'
import './Contact.css'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  })
  const [formStatus, setFormStatus] = useState({ type: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Email validation regex
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Phone validation (basic - checks for at least 10 digits)
  const validatePhone = (phone) => {
    const phoneRegex = /^\d{10,}$/
    return phoneRegex.test(phone.replace(/\D/g, ''))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormStatus({ type: '', message: '' })

    // Validation
    if (!formData.name.trim()) {
      setFormStatus({ type: 'error', message: 'Please enter your name' })
      return
    }

    if (!formData.phone.trim()) {
      setFormStatus({ type: 'error', message: 'Please enter your phone number' })
      return
    }

    if (!validatePhone(formData.phone)) {
      setFormStatus({ type: 'error', message: 'Please enter a valid phone number (at least 10 digits)' })
      return
    }

    if (!formData.email.trim()) {
      setFormStatus({ type: 'error', message: 'Please enter your email address' })
      return
    }

    if (!validateEmail(formData.email)) {
      setFormStatus({ type: 'error', message: 'Please enter a valid email address' })
      return
    }

    if (!formData.message.trim()) {
      setFormStatus({ type: 'error', message: 'Please enter your message' })
      return
    }

    // Simulate form submission
    setIsSubmitting(true)
    try {
      // In a real application, you would send this to a backend API
      // await fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) })
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      console.log('Form submitted:', formData)
      setFormStatus({ 
        type: 'success', 
        message: 'Thank you for your message! We will contact you soon.' 
      })
      setFormData({ name: '', phone: '', email: '', message: '' })
    } catch (error) {
      setFormStatus({ 
        type: 'error', 
        message: 'Failed to send message. Please try again.' 
      })
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const contactInfo = [
    { icon: <FaMapMarkerAlt />, title: 'Address', info: '8/7-1,Navapatti,Bhavani Main Road,Mettur Dam,Salem,Tamil Nadu 636452' },
    { icon: <FaPhone />, title: 'Phone', info: '8098389303' },
    { icon: <FaEnvelope />, title: 'Email', info: 'srbulkers@gmail.com' },
    { icon: <FaClock />, title: 'Working Hours', info: 'Mon-Fri: 8:00 AM - 6:00 PM' }
  ]

  const socialLinks = [
    { icon: <FaFacebook />, url: '#', label: 'Facebook' },
    { icon: <FaTwitter />, url: '#', label: 'Twitter' },
    { icon: <FaLinkedin />, url: '#', label: 'LinkedIn' },
    { icon: <FaInstagram />, url: '#', label: 'Instagram' }
  ]

  return (
    <section id="contact" className="white-section contact-section">
      <div className="container">
        <div className="contact-header" data-aos="fade-up">
          <h2 className="contact-title">Contact Us</h2>
          <p className="contact-subtitle">
            Get in touch with our team. We're here to help and answer any questions you might have.
          </p>
        </div>

        <div className="contact-container">
          <motion.div 
            className="contact-info"
            data-aos="fade-right"
          >
            <h3 className="contact-info-title">Get in Touch</h3>
            
            <div className="info-list">
              {contactInfo.map((info, index) => (
                <motion.div 
                  key={index}
                  className="info-item"
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="info-icon">{info.icon}</div>
                  <div className="info-content">
                    <h4>{info.title}</h4>
                    <p>{info.info}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="social-links">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  className="social-link"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            className="contact-form-container"
            data-aos="fade-left"
            data-aos-delay="200"
          >
            <h3 className="form-title">Send Message</h3>
            
            {formStatus.message && (
              <motion.div 
                className={`form-status ${formStatus.type}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                role="alert"
              >
                {formStatus.type === 'success' ? '✓' : '⚠'} {formStatus.message}
              </motion.div>
            )}
            
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="contact-name">Name</label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Your Name"
                  required
                  disabled={isSubmitting}
                />
              </div>
              
              <div className="form-group">
                <label className="form-label" htmlFor="contact-phone">Phone</label>
                <input
                  id="contact-phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Your Phone Number"
                  required
                  disabled={isSubmitting}
                />
              </div>
              
              <div className="form-group">
                <label className="form-label" htmlFor="contact-email">Email</label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Your Email Address"
                  required
                  disabled={isSubmitting}
                />
              </div>
              
              <div className="form-group">
                <label className="form-label" htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="form-textarea"
                  placeholder="Your Message"
                  required
                  disabled={isSubmitting}
                />
              </div>
              
              <motion.button
                type="submit"
                className="btn btn-primary submit-button"
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact