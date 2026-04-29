import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./silos.css";

// Import images (adjust paths as needed)
import siloMain from "../assets/images/silo.png";
import img1 from "../assets/images/silo.png";
import img2 from "../assets/images/silo.png";
import img3 from "../assets/images/silo.png";
import img4 from "../assets/images/silo.png";

const thumbnails = [
  { src: img1, alt: "Side view" },
  { src: img2, alt: "Top view" },
  { src: img3, alt: "Detail view" },
  { src: img4, alt: "Installation view" },
];

const Silos = () => {
  const navigate = useNavigate();
  const [activeImg, setActiveImg] = useState(siloMain);
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <div className="silos-page">
      <Navbar />

      {/* ── HERO BANNER ── */}
      <div className="si-hero">
        <div className="si-hero-content">
          <span className="si-hero-eyebrow">Industrial Solution</span>
          <h1 className="si-hero-title">Storage Silos</h1>
          <p className="si-hero-sub">"Reliable storage. Engineered for efficiency."</p>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <main className="product-main">
        <div className="product-container">
          <div className="product-layout">

            {/* LEFT — Images */}
            <section className="image-section">
              <div className="main-image-wrapper">
                <img
                  src={activeImg}
                  alt="Storage Silo"
                  className="main-image"
                />
              </div>
              <div className="thumbnail-strip">
                {thumbnails.map((t, i) => (
                  <div
                    key={i}
                    className={`thumbnail-item${activeIdx === i ? " active" : ""}`}
                    onClick={() => { setActiveImg(t.src); setActiveIdx(i); }}
                  >
                    <img src={t.src} alt={t.alt} />
                  </div>
                ))}
              </div>
            </section>

            {/* RIGHT — Details */}
            <section className="details-section">

              <div className="product-header">
                <span className="product-badge">Premium Series</span>
                <h1 className="product-title">Storage Silos</h1>
                <p className="product-description">
                  Engineered for optimal grain and material storage. Our silos combine robust 
                  construction with advanced aeration systems, designed for preserving quality 
                  and maximizing capacity in agricultural and industrial applications.
                </p>
              </div>

              <hr className="si-divider" />

              {/* Specifications */}
              <div className="specs-container">
                <h3 className="specs-heading">Technical Specifications</h3>
                <div className="specs-list">
                  <div className="spec-row">
                    <span className="spec-label">Model</span>
                    <span className="spec-value">Storage Silo Series</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-label">Construction</span>
                    <span className="spec-value">Galvanized Steel / Stainless Steel</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-label">Capacity Range</span>
                    <span className="spec-value">50 Ton &nbsp;/&nbsp; 100 Ton &nbsp;/&nbsp; 200 Ton</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-label">Aeration System</span>
                    <span className="spec-value">High-Flow Centrifugal Fan</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-label">Temperature Monitoring</span>
                    <span className="spec-value">Digital Sensor Array (Optional)</span>
                  </div>

                  {/* Capacity range — visual range bar */}
                  <div className="spec-row spec-range-row">
                    <span className="spec-label">Storage Capacity</span>
                    <div className="spec-range">
                      <div className="range-track">
                        <div className="range-fill" />
                        <span className="range-min">50T</span>
                        <span className="range-max">200T+</span>
                      </div>
                      <span className="range-note">Customisable per order</span>
                    </div>
                  </div>

                  <div className="spec-row">
                    <span className="spec-label">Loading System</span>
                    <span className="spec-value">Bucket Elevator / Pneumatic Conveyor</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-label">Protection</span>
                    <span className="spec-value">Anti-corrosion coating + Lightning protection</span>
                  </div>
                </div>
              </div>

              <hr className="si-divider" />

              {/* Key Features */}
              <div className="features-container">
                <h3 className="features-heading">Key Features</h3>
                <ul className="features-list">
                  {[
                    "Heavy-duty galvanized steel construction for maximum durability",
                    "Advanced aeration system for temperature and moisture control",
                    "50–200+ Ton capacity range for various storage needs",
                    "Digital monitoring system for real-time inventory tracking",
                    "Quick installation with modular bolt-together design",
                  ].map((f) => (
                    <li className="feature-item" key={f}>
                      <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"/>
                      </svg>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Buttons */}
              <div className="action-buttons">
                <button
                  className="btn-primary"
                  onClick={() => {
                    navigate("/");
                    setTimeout(() => {
                      const section = document.getElementById("quote");
                      section?.scrollIntoView({ behavior: "smooth" });
                    }, 300);
                  }}
                >
                  Request Quote — Contact Sales
                </button>
                <button
                  className="btn-secondary"
                  onClick={() => {
                    // Download brochure functionality
                    window.open("/brochures/silo-specs.pdf", "_blank");
                  }}
                >
                  Download Brochure
                </button>
              </div>

            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Silos;