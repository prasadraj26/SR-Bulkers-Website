import { useState } from 'react'
import { motion } from 'framer-motion'
import { db } from '../firebase'
import { ref, push } from 'firebase/database'
import { 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaClock 
} from 'react-icons/fa'
import './QuoteForm.css'

const QuoteForm = ({ 
  title = "GET A QUOTE", 
  subtitle = "Tell us your requirements and we’ll get back to you." 
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

      // store in Firebase
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

        <div className="quote-header">
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>

        <div className="quote-container">

          {/* CONTACT INFO */}
          <div className="quote-info">
            {contactInfo.map((info, index) => (
              <div key={index} className="info-item">
                <div className="info-icon">{info.icon}</div>
                <div>
                  <h4>{info.title}</h4>
                  <p>{info.info}</p>
                </div>
              </div>
            ))}
          </div>

          {/* FORM */}
          <div className="quote-form-container">

            {formStatus.message && (
              <div className={`form-status ${formStatus.type}`}>
                {formStatus.type === 'success' ? '✓' : '⚠'} {formStatus.message}
              </div>
            )}

            <form onSubmit={handleEmailSubmit}>

              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />

              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
              >
                <option value="">Select Service</option>
                <option value="Custom Truck Body">Custom Truck Body</option>
                <option value="Silo Manufacturing">Silo Manufacturing</option>
                <option value="Repair & Maintenance">Repair & Maintenance</option>
              </select>

              <textarea
                name="message"
                placeholder="Requirement"
                value={formData.message}
                onChange={handleChange}
              />

              <button type="submit" disabled={isSubmitting}>
                Send via Email
              </button>

              <button type="button" onClick={handleWhatsAppSubmit}>
                Send via WhatsApp
              </button>

            </form>

          </div>

        </div>
      </div>
    </section>
  )
}

export default QuoteForm
