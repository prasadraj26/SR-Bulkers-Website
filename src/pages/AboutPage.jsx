import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./AboutPage.css";
import logo from '../assets/images/logo.jpg';
import team from '../assets/images/team.png';
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const AboutPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: 'ease-out-quart',
      once: true,
      mirror: false,
      offset: 60,
    });
  }, []);

  return (
    <>
      <Navbar />

      <main className="about-page">

        {/* HERO BANNER */}
        <section className="about-hero">
          <div className="hero-overlay" />
          <div className="hero-content" data-aos="fade-up">
            <span className="hero-eyebrow">Since 2012</span>
            <h1 className="hero-title">Engineered for Strength.<br />Delivered with Precision.</h1>
            <p className="hero-subtitle">
              "Engineering excellence isn't just our standard — it's our promise."
            </p>
          </div>
        </section>

        {/* WHO WE ARE */}
        <section className="about-section">
          <div className="about-container two-col">
            <div className="col-text" data-aos="fade-right">
              <span className="section-label">Who We Are</span>
              <h2 className="about-title">Precision Fabrication,<br />Trusted Results</h2>
              <p className="about-text">
                SR Bulkers is a trusted manufacturer specializing in custom truck bulker
                fabrication. With years of industry experience, we focus on durability,
                safety, and precision engineering to deliver reliable vehicle solutions
                that stand the test of time and terrain.
              </p>
              <blockquote className="inline-quote">
                "Every weld, every bolt, every panel — crafted with purpose."
              </blockquote>
            </div>
            <div className="col-image" data-aos="fade-left" data-aos-delay="150">
              <div className="image-frame">
                <img src={logo} alt="SR Bulkers Logo" className="about-logo" />
              </div>
            </div>
          </div>
        </section>

        {/* WHAT WE DO */}
        <section className="about-section light-bg">
          <div className="about-container">
            <div className="section-header center" data-aos="fade-up">
              <span className="section-label">What We Do</span>
              <h2 className="about-title center">Our Core Services</h2>
              <p className="section-subtext">
                From fabrication to maintenance, we deliver end-to-end solutions
                that keep your fleet strong and operational.
              </p>
            </div>

            <div className="services-grid">
              <div className="service-card" data-aos="fade-up" data-aos-delay="100">
                <div className="service-icon">🏗️</div>
                <h3>Custom Truck Bodies</h3>
                <p>
                  High-quality bulker and tipper body fabrication built to
                  industry standards, engineered for heavy-duty performance.
                </p>
              </div>

              <div className="service-card" data-aos="fade-up" data-aos-delay="200">
                <div className="service-icon">🔧</div>
                <h3>Vehicle Modification</h3>
                <p>
                  Tailored vehicle designs based on operational and client
                  requirements — no two projects are exactly alike.
                </p>
              </div>

              <div className="service-card" data-aos="fade-up" data-aos-delay="300">
                <div className="service-icon">🛠️</div>
                <h3>Repair & Maintenance</h3>
                <p>
                  Reliable repair and maintenance services ensuring long-term
                  performance and maximum uptime for your fleet.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* QUOTE BANNER */}
        <section className="quote-banner">
          <div className="about-container">
            <blockquote className="big-quote" data-aos="zoom-in">
              "Strength is built on the production floor — and earned on the road."
            </blockquote>
            <cite className="big-quote-cite">— SR Bulkers, Founding Principle</cite>
          </div>
        </section>

        {/* OUR TEAM */}
        <section className="about-section">
          <div className="about-container two-col reverse">
            <div className="col-text" data-aos="fade-left">
              <span className="section-label">Our Team</span>
              <h2 className="about-title">The People Behind<br />Every Build</h2>
              <p className="about-text">
                Our experienced engineers, technicians, and fabricators work
                together with dedication and teamwork to deliver reliable,
                high-quality truck solutions for every project — on time,
                every time.
              </p>
              <blockquote className="inline-quote">
                "Skilled hands, sharp minds, and a shared mission."
              </blockquote>
            </div>
            <div className="col-image" data-aos="fade-right" data-aos-delay="150">
              <div className="image-frame">
                <img src={team} alt="SR Bulkers Team" className="team-logo" />
              </div>
            </div>
          </div>
        </section>

        {/* MISSION */}
        <section className="about-section mission-bg">
          <div className="about-container">
            <div className="mission-inner" data-aos="fade-up">
              <span className="section-label light">Our Mission</span>
              <h2 className="about-title center light">Driving Industry Forward</h2>
              <p className="about-text max-width center">
                Our mission is to deliver durable, safe, and efficient truck solutions
                while maintaining the highest standards of quality, safety, and
                long-term customer trust — because your success is our success.
              </p>
              <div className="mission-stats">
                <div className="stat-item" data-aos="fade-up" data-aos-delay="100">
                  <span className="stat-number">500+</span>
                  <span className="stat-label">Vehicles Delivered</span>
                </div>
                <div className="stat-divider" />
                <div className="stat-item" data-aos="fade-up" data-aos-delay="200">
                  <span className="stat-number">15+</span>
                  <span className="stat-label">Years of Experience</span>
                </div>
                <div className="stat-divider" />
                <div className="stat-item" data-aos="fade-up" data-aos-delay="300">
                  <span className="stat-number">100%</span>
                  <span className="stat-label">Client Satisfaction</span>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
};

export default AboutPage;