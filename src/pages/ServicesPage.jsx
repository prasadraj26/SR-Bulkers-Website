import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import bulkerImg from "../assets/images/side.png";
import siloImg from "../assets/images/silo.png";
import AOS from "aos";
import "aos/dist/aos.css";
import "./ServicesPage.css";

const ServicesPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
      offset: 50
    });
  }, []);

  return (
    <>
      <Navbar />

      <main className="services-page">

        {/* HERO SECTION */}
        <section className="sp-hero-section">
          <div className="sp-container" data-aos="fade-up">
            <div className="sp-hero-content">
              <h1 className="sp-hero-title">
                Excellence of <span>Our Services</span> & After Sales
              </h1>
              <p className="sp-hero-description">
                At SR Bulkers, we're dedicated to delivering exceptional after-sales service. 
                Our team of experts provides tailored solutions to meet the unique needs of 
                each client, ensuring optimal performance, minimal downtime, and long-term value.
              </p>
            </div>
          </div>
        </section>

        {/* CORE SERVICES */}
        <section className="sp-core-services-section">
          <div className="sp-container">
            <div className="sp-section-header" data-aos="fade-up">
              <h2 className="sp-section-title">Our Core Services</h2>
              <p className="sp-section-subtitle">
                Comprehensive solutions designed to keep your operations running smoothly and efficiently.
              </p>
            </div>
            
            <div className="sp-services-grid">
              <div className="sp-service-card" data-aos="fade-up" data-aos-delay="100">
                <div className="sp-card-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
                  </svg>
                </div>
                <h3>Maintenance</h3>
                <p>Regular checks and maintenance to prevent issues and ensure optimal equipment performance.</p>
              </div>
              
              <div className="sp-service-card" data-aos="fade-up" data-aos-delay="150">
                <div className="sp-card-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </div>
                <h3>Repairs</h3>
                <p>Prompt and efficient repair services to minimize downtime and get you back on track quickly.</p>
              </div>
              
              <div className="sp-service-card" data-aos="fade-up" data-aos-delay="200">
                <div className="sp-card-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                    <polyline points="17 6 23 6 23 12"/>
                  </svg>
                </div>
                <h3>Upgrades</h3>
                <p>Enhancements to improve product functionality, safety, and operational efficiency.</p>
              </div>
              
              <div className="sp-service-card" data-aos="fade-up" data-aos-delay="250">
                <div className="sp-card-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="2" y1="12" x2="22" y2="12"/>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                  </svg>
                </div>
                <h3>Technical Assistance</h3>
                <p>Immediate support when you need it, with expert guidance for any technical challenges.</p>
              </div>
            </div>
          </div>
        </section>

        {/* BULKER TANK SECTION */}
        <section className="sp-product-section">
          <div className="sp-container sp-two-column-layout">
            <div className="sp-content-side" data-aos="fade-right">
              <h2 className="sp-product-title">Bulker Tank Solutions</h2>
              <p className="sp-product-description">
                We specialize in the design and fabrication of high-capacity bulker tanks 
                engineered for durability, safety, and operational efficiency. Our bulker 
                tanks are built to meet demanding industrial transportation requirements.
              </p>
              <ul className="sp-features-list">
                <li>Custom capacity designs from 20 to 60 cubic meters</li>
                <li>High-strength steel construction</li>
                <li>Advanced pressure control systems</li>
                <li>Corrosion-resistant coatings</li>
                <li>Compliant with industry safety standards</li>
              </ul>
              <button className="sp-learn-more-btn" onClick={() => navigate('/bulker-solutions')}>
                Learn More
              </button>
            </div>
            
            <div className="sp-image-side" data-aos="fade-left" data-aos-delay="200">
              <div className="sp-image-wrapper">
                <img src={bulkerImg} alt="Bulker Tank" className="sp-product-image" />
                <div className="sp-image-overlay">
                  <span>BULKER TANKS</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SILOS SECTION */}
        <section className="sp-product-section sp-light-bg">
          <div className="sp-container sp-two-column-layout sp-reverse">
            <div className="sp-content-side" data-aos="fade-left">
              <h2 className="sp-product-title">Silo Manufacturing</h2>
              <p className="sp-product-description">
                Our silo manufacturing solutions are tailored for bulk material storage 
                across industries. Designed with precision engineering, our silos ensure 
                structural integrity, long service life, and efficient material handling.
              </p>
              <ul className="sp-features-list">
                <li>Capacity range from 50 to 500 tons</li>
                <li>Modular and custom designs available</li>
                <li>Integrated ventilation and aeration systems</li>
                <li>Automated material level monitoring</li>
                <li>Easy installation and maintenance</li>
              </ul>
              <button className="sp-learn-more-btn" onClick={() => navigate('/silo-solutions')}>
                Learn More
              </button>
            </div>
            
            <div className="sp-image-side" data-aos="fade-right" data-aos-delay="200">
              <div className="sp-image-wrapper">
                <img src={siloImg} alt="Industrial Silo" className="sp-product-image" />
                <div className="sp-image-overlay">
                  <span>STORAGE SILOS</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICE ADVANTAGES */}
        <section className="sp-advantages-section">
          <div className="sp-container">
            <div className="sp-section-header" data-aos="fade-up">
              <h2 className="sp-section-title">The <span>SR Bulkers</span> Advantage</h2>
              <p className="sp-section-subtitle">
                We're committed to preserving the longevity and effectiveness of your 
                equipment through superior after-sales support.
              </p>
            </div>
            
            <div className="sp-advantages-grid">
              <div className="sp-advantage-card" data-aos="zoom-in" data-aos-delay="100">
                <div className="sp-advantage-number">01</div>
                <h3>Quick Response Time</h3>
                <p>We prioritize your concerns, minimizing downtime and ensuring smooth operations with rapid service deployment.</p>
              </div>
              
              <div className="sp-advantage-card" data-aos="zoom-in" data-aos-delay="150">
                <div className="sp-advantage-number">02</div>
                <h3>Experienced Technicians</h3>
                <p>Our skilled professionals bring extensive expertise to every task, ensuring high-quality, reliable service.</p>
              </div>
              
              <div className="sp-advantage-card" data-aos="zoom-in" data-aos-delay="200">
                <div className="sp-advantage-number">03</div>
                <h3>Wide Service Network</h3>
                <p>With a strong network of service centers, we ensure prompt support wherever your operations are located.</p>
              </div>
              
              <div className="sp-advantage-card" data-aos="zoom-in" data-aos-delay="250">
                <div className="sp-advantage-number">04</div>
                <h3>Quality Guarantee</h3>
                <p>We guarantee on-time service using only genuine parts, ensuring the highest quality and customer satisfaction.</p>
              </div>
              
              <div className="sp-advantage-card" data-aos="zoom-in" data-aos-delay="300">
                <div className="sp-advantage-number">05</div>
                <h3>Tailored Solutions</h3>
                <p>Our after-sales service is customized to fit your specific requirements, ensuring optimal performance.</p>
              </div>
              
              <div className="sp-advantage-card" data-aos="zoom-in" data-aos-delay="350">
                <div className="sp-advantage-number">06</div>
                <h3>Continuous Support</h3>
                <p>Our commitment doesn't end after service. We offer ongoing support and guidance for long-term satisfaction.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="sp-cta-section">
          <div className="sp-container" data-aos="fade-up">
            <div className="sp-cta-content">
              <h2 className="sp-cta-title">Ready to Experience the SR Bulkers Difference?</h2>
              <p className="sp-cta-description">
                Maximize your equipment's efficiency and longevity with our exceptional after-sales service.
              </p>
              <button className="sp-cta-button" onClick={() => navigate('/')}>
                Contact Us for Service
              </button>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
};

export default ServicesPage;