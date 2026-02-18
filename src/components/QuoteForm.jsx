import { useState } from 'react'
import { motion } from 'framer-motion'
import { db } from '../firebase'
import { ref, push } from 'firebase/database'
import { 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaClock, 
  FaFacebook, 
  FaTwitter, 
  FaLinkedin, 
  FaInstagram 
} from 'react-icons/fa'
import './QuoteForm.css'

const QuoteForm = ({ 
  title = "Get a Quote", 
  subtitle = "Tell us your requirements and we’ll get back to you." 
}) => {

  const WHATSAPP_NUMBER = "916384153370"; // ✅ UPDATED NUMBER

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: ''
  })

  const [formStatus, setFormStatus] = useState({ type: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePhone = (phone) => {
    const phoneRegex = /^\d{10,}$/
    return phoneRegex.test(phone.replace(/\D/g, ''))
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const validateForm = () => {
    if (!formData.name.trim()) return "Please enter your name"
    if (!validatePhone(formData.phone)) return "Enter valid phone number"
    if (!validateEmail(formData.email)) return "Enter valid email"
    if (!formData.service) return "Please select a service"
    if (!formData.message.trim()) return "Please enter your requirement"
    return null
  }

  /* ===============================
     EMAIL SUBMIT (SAVE TO FIREBASE)
  =============================== */
  const handleEmailSubmit = async (e) => {
    e.preventDefault()

    const error = validateForm()
    if (error) {
      setFormStatus({ type: 'error', message: error })
      return
    }

    setIsSubmitting(true)

    try {
      const quotesRef = ref(db, 'quotes')

      await push(quotesRef, {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        service: formData.service,
        message: formData.message,
        submittedVia: "Email",
        status: "Pending",
        createdAt: Date.now()
      })

      setFormStatus({
        type: 'success',
        message: 'Quote request submitted successfully!'
      })

      setFormData({
        name: '',
        phone: '',
        email: '',
        service: '',
        message: ''
      })

    } catch (error) {
      console.error("Firebase Error:", error)
      setFormStatus({
        type: 'error',
        message: 'Failed to submit. Please try again.'
      })
    }

    setIsSubmitting(false)
  }

  /* ===============================
     WHATSAPP SUBMIT
  =============================== */
  const handleWhatsAppSubmit = () => {
    const error = validateForm()
    if (error) {
      setFormStatus({ type: 'error', message: error })
      return
    }

    const message = `
Hello SR Builders,
Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email}
Service: ${formData.service}
Requirement: ${formData.message}
    `

    const encodedMessage = encodeURIComponent(message)

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`,
      "_blank"
    )
  }

  const contactInfo = [
    { icon: <FaMapMarkerAlt />, title: 'Address', info: '8/7-1, Navapatti, Bhavani Main Road, Mettur Dam, Salem, Tamil Nadu 636452' },
    { icon: <FaPhone />, title: 'Phone', info: '6384153370' }, // ✅ UPDATED DISPLAY NUMBER
    { icon: <FaEnvelope />, title: 'Email', info: 'srbulkers@gmail.com' },
    { icon: <FaClock />, title: 'Working Hours', info: 'Mon-Fri: 8:00 AM - 6:00 PM' }
  ]

  const socialLinks = [
    { icon: <FaFacebook />, url: '#' },
    { icon: <FaTwitter />, url: '#' },
    { icon: <FaLinkedin />, url: '#' },
    { icon: <FaInstagram />, url: '#' }
  ]

  return (
    <section className="quote-section">
      <div className="container">

        <div className="quote-header">
          <h2 className="quote-title">{title}</h2>
          <p className="quote-subtitle">{subtitle}</p>
        </div>

        <div className="quote-container">

          <motion.div className="quote-info">
            <h3 className="quote-info-title">Get in Touch</h3>

            <div className="info-list">
              {contactInfo.map((info, index) => (
                <motion.div key={index} className="info-item" whileHover={{ x: 10 }}>
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
                  whileHover={{ scale: 1.1 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div className="quote-form-container">

            {formStatus.message && (
              <div className={`form-status ${formStatus.type}`}>
                {formStatus.type === 'success' ? '✓' : '⚠'} {formStatus.message}
              </div>
            )}

            <form className="quote-form" onSubmit={handleEmailSubmit}>

              <div className="form-group">
                <label>Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>Phone</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>Service</label>
                <select name="service" value={formData.service} onChange={handleChange}>
                  <option value="">Select Service</option>
                  <option value="Custom Truck Body">Custom Truck Body</option>
                  <option value="Silo Manufacturing">Silo Manufacturing</option>
                  <option value="Repair & Maintenance">Repair & Maintenance</option>
                </select>
              </div>

              <div className="form-group">
                <label>Requirement</label>
                <textarea name="message" value={formData.message} onChange={handleChange} />
              </div>

              <div className="button-group">
                <button type="submit" className="btn btn-primary">
                  Send via Email
                </button>

                <button
                  type="button"
                  className="btn whatsapp-btn"
                  onClick={handleWhatsAppSubmit}
                >
                  Send via WhatsApp
                </button>
              </div>

            </form>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

export default QuoteForm