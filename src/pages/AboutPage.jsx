import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./AboutPage.css";
import logo from '../assets/images/logo.jpg'
import team from '../assets/images/team.png'
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const AboutPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
      offset: 100
    });
  }, []);

  return (
    <>
      {/* NAVBAR */}
      <Navbar />

      <main className="about-page">

        {/* WHO WE ARE */}
        <section className="about-section">
          <div className="about-container two-col">
            <div data-aos="fade-right" data-aos-delay="100">
              <h2 className="about-title">Who We Are</h2>
              <p className="about-text" data-aos="fade-up" data-aos-delay="200">
                SR Bulkers is a trusted manufacturer specializing in custom
                truck bulker fabrication. With years of industry experience,
                we focus on durability, safety, and precision engineering to
                deliver reliable vehicle solutions.
              </p>
            </div>

            <img
              src={logo}
              alt="SR Bulkers Logo"
              className="about-logo"
              data-aos="fade-left"
              data-aos-delay="300"
            />
          </div>
        </section>

        {/* WHAT WE DO */}
        <section className="about-section light-bg">
          <div className="about-container">
            <h2 className="about-title center" data-aos="fade-down" data-aos-delay="100">
              What We Do
            </h2>

            <div className="services-grid">
              <div className="service-card" data-aos="zoom-in" data-aos-delay="200">
                <h3>Custom Truck Bodies</h3>
                <p>
                  High-quality bulker and tipper body fabrication built to
                  industry standards.
                </p>
              </div>

              <div className="service-card" data-aos="zoom-in" data-aos-delay="300">
                <h3>Vehicle Modification</h3>
                <p>
                  Tailored vehicle designs based on operational and client
                  requirements.
                </p>
              </div>

              <div className="service-card" data-aos="zoom-in" data-aos-delay="400">
                <h3>Repair & Maintenance</h3>
                <p>
                  Reliable repair and maintenance services ensuring long-term
                  performance.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* OUR TEAM */}
        <section className="about-section">
          <div className="about-container two-col reverse">
            <img
              src={team}
              alt="SR Bulkers Team"
              className="team-logo"
              data-aos="fade-right"
              data-aos-delay="200"
            />
            <div data-aos="fade-left" data-aos-delay="100">
              <h2 className="about-title">Our Team</h2>
              <p className="about-text">
                Our experienced engineers, technicians, and fabricators work
                together with dedication and teamwork to deliver reliable,
                high-quality truck solutions for every project.
              </p>
            </div>
          </div>
        </section>

        {/* MISSION */}
        <section className="about-section mission-bg">
          <div className="about-container center">
            <h2 className="about-title" data-aos="fade-up" data-aos-delay="100">
              Our Mission
            </h2>
            <p className="about-text max-width" data-aos="fade-up" data-aos-delay="200">
              Our mission is to deliver durable, safe, and efficient truck
              solutions while maintaining high standards of quality, safety,
              and long-term customer trust.
            </p>
          </div>
        </section>

        {/* BACK BUTTON */}
        <div className="about-back-wrapper" data-aos="fade-up" data-aos-delay="300">
          <button
            className="about-back-btn"
            onClick={() => navigate(-1)}
          >
            ← Go Back
          </button>
        </div>

      </main>

      {/* FOOTER */}
      <Footer />
    </>
  );
};

export default AboutPage;