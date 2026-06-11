import { useState } from 'react'
import { motion } from 'framer-motion'
import { db } from '../firebase'
import { ref, push } from 'firebase/database'
import { 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaClock,
  FaWhatsapp,
  FaPaperPlane
} from 'react-icons/fa'
import './QuoteForm.css'

const QuoteForm = ({ 
  title = "GET A QUOTE", 
  subtitle = "Tell us your requirements and we'll get back to you." 
}) => {

  const WHATSAPP_NUMBER = "916384153370"

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: ''
  })

  const [formStatus, setFormStatus] = useState({ type: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const validatePhone = (phone) =>
    /^\d{10,}$/.test(phone.replace(/\D/g, ''))

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

  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      service: '',
      message: ''
    })
  }

  // EMAIL SUBMISSION
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
        ...formData,
        submittedVia: "Email",
        status: "Pending",
        createdAt: Date.now()
      })

      setFormStatus({
        type: 'success',
        message: 'Quote request submitted successfully!'
      })

      resetForm()

    } catch (error) {
      setFormStatus({
        type: 'error',
        message: 'Failed to submit. Please try again.'
      })
    }

    setIsSubmitting(false)
  }

  // WHATSAPP SUBMISSION
  const handleWhatsAppSubmit = async () => {

    const error = validateForm()
    if (error) {
      setFormStatus({ type: 'error', message: error })
      return
    }

    try {

      const quotesRef = ref(db, 'quotes')

      await push(quotesRef, {
        ...formData,
        submittedVia: "WhatsApp",
        status: "Pending",
        createdAt: Date.now()
      })

      const message = `
Hello SR Bulkers,

Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email}
Service: ${formData.service}

Requirement:
${formData.message}
      `

      const encodedMessage = encodeURIComponent(message)

      window.open(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`,
        "_blank"
      )

      setFormStatus({
        type: 'success',
        message: 'Opening WhatsApp...'
      })

      resetForm()

    } catch (error) {
      setFormStatus({
        type: 'error',
        message: 'Failed to send quote.'
      })
    }
  }

  const contactInfo = [
    { icon: <FaMapMarkerAlt />, title: 'Address', info: '8/7-1, Navapatti, Bhavani Main Road, Mettur Dam, Salem, Tamil Nadu 636452' },
    { icon: <FaPhone />, title: 'Phone', info: '6384153370' },
    { icon: <FaEnvelope />, title: 'Email', info: 'srbulkers@gmail.com' },
    { icon: <FaClock />, title: 'Working Hours', info: 'Mon-Fri: 8:00 AM - 6:00 PM' }
  ]

  return (
    <section id="quote" className="quote-section">
      <div className="container">

        <motion.div 
          className="quote-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </motion.div>

        <div className="quote-container">

          {/* CONTACT INFO */}
          <motion.div 
            className="quote-info"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {contactInfo.map((info, index) => (
              <div key={index} className="info-item">
                <div className="info-icon">{info.icon}</div>
                <div>
                  <h4>{info.title}</h4>
                  <p>{info.info}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* FORM */}
          <motion.div 
            className="quote-form-container"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >

            {formStatus.message && (
              <div className={`form-status ${formStatus.type}`}>
                {formStatus.type === 'success' ? '✓' : '⚠'} {formStatus.message}
              </div>
            )}

            <form onSubmit={handleEmailSubmit}>

              <input
                type="text"
                name="name"
                placeholder="Your Name *"
                value={formData.name}
                onChange={handleChange}
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number *"
                value={formData.phone}
                onChange={handleChange}
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address *"
                value={formData.email}
                onChange={handleChange}
              />

              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
              >
                <option value="">Select Service *</option>
                <option value="Custom Truck Body">Custom Truck Body</option>
                <option value="Silo Manufacturing">Silo Manufacturing</option>
                <option value="Repair & Maintenance">Repair & Maintenance</option>
                <option value="FC Painting">FC Painting</option>
              </select>

              <textarea
                name="message"
                placeholder="Tell us your requirements *"
                value={formData.message}
                onChange={handleChange}
              />

              <div className="button-group">
                <button type="submit" disabled={isSubmitting} className="btn-email">
                  <FaPaperPlane /> Send via Email
                </button>

                <button type="button" onClick={handleWhatsAppSubmit} className="btn-whatsapp">
                  <FaWhatsapp /> Send via WhatsApp
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