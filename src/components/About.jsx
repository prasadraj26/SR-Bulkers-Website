import { FaArrowRight, FaIndustry, FaTools, FaTruck, FaHandshake } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import './About.css'

const About = () => {
  const navigate = useNavigate()

  return (
    <section id="about" className="about-section">
      <div className="about-container">

        {/* HEADER */}
        <div className="section-header">
          <h2 className="section-title">WELCOME</h2>
          <p className="section-subtitle">
            SR Bulkers is a trusted manufacturer of cement bulkers and trailers,
            established in 2012 at Mettur, Tamil Nadu. With over 12 years of experience,
            we focus on strong build quality, safety, and long service life.
          </p>
        </div>

        {/* TRUST POINTS */}
        <div className="about-points">
          <div className="about-point">🏭 12+ Years Manufacturing Experience</div>
          <div className="about-point">🔧 Strong & Reliable Bulker Designs</div>
          <div className="about-point">🤝 Trusted by Construction & Logistics Companies</div>
        </div>

        {/* READ MORE */}
        <div className="about-read-more">
          <button className="tech-button" onClick={() => navigate('/about')}>
            Read More About Us
            <FaArrowRight className="button-icon" />
          </button>
        </div>

        {/* WHY CHOOSE US */}
        <div className="why-choose-section">
          <h3 className="why-title">Why Choose SR Bulkers</h3>

          <div className="why-grid">
            <div className="why-card">
              <FaIndustry className="why-icon" />
              <h4>12+ Years Experience</h4>
              <p>Proven manufacturing expertise</p>
            </div>

            <div className="why-card">
              <FaTools className="why-icon" />
              <h4>Strong Build Quality</h4>
              <p>Designed for Indian roads</p>
            </div>

            <div className="why-card">
              <FaTruck className="why-icon" />
              <h4>On-Time Delivery</h4>
              <p>Committed timelines</p>
            </div>

            <div className="why-card">
              <FaHandshake className="why-icon" />
              <h4>After-Sales Support</h4>
              <p>Support after delivery</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default About
