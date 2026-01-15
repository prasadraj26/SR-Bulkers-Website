import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./AboutPage.css";
import logo from '../assets/images/logo.jpg'
import team from '../assets/images/team.png'
const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* NAVBAR */}
      <Navbar />

      <main className="about-page">

        {/* WHO WE ARE */}
        <section className="about-section">
          <div className="about-container two-col">
            <div>
              <h2 className="about-title">Who We Are</h2>
              <div className="about-underline"></div>
              <p className="about-text">
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
/>

          </div>
        </section>

        {/* WHAT WE DO */}
        <section className="about-section light-bg">
          <div className="about-container">
            <h2 className="about-title center">What We Do</h2>
            <div className="about-underline center"></div>

            <div className="services-grid">
              <div className="service-card">
                <h3>Custom Truck Bodies</h3>
                <p>
                  High-quality bulker and tipper body fabrication built to
                  industry standards.
                </p>
              </div>

              <div className="service-card">
                <h3>Vehicle Modification</h3>
                <p>
                  Tailored vehicle designs based on operational and client
                  requirements.
                </p>
              </div>

              <div className="service-card">
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
/>
            <div>
              <h2 className="about-title">Our Team</h2>
              <div className="about-underline"></div>
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
            <h2 className="about-title">Our Mission</h2>
            <div className="about-underline center"></div>
            <p className="about-text max-width">
              Our mission is to deliver durable, safe, and efficient truck
              solutions while maintaining high standards of quality, safety,
              and long-term customer trust.
            </p>
          </div>
        </section>

        {/* BACK BUTTON */}
        <div className="about-back-wrapper">
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
