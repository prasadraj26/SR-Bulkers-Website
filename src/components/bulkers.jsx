import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./bulkers.css";

// Import images
import bannerImg from "../assets/images/back.png";
import bulkerMain from "../assets/images/BUL-T.png";
import img1 from "../assets/images/trailler tank.png";
import img2 from "../assets/images/silo.png";
import img3 from "../assets/images/team.png";
import img4 from "../assets/images/wheel.png";

const Bulkers = () => {
  return (
    <div className="bulkers-page">
      <Navbar />

      {/* ===== MAIN CONTENT ===== */}
      <main className="product-main">
        <div className="product-container">
          
          {/* Two Column Layout */}
          <div className="product-layout">
            
            {/* Left Column - Images */}
            <section className="image-section">
              {/* Main Image */}
              <div className="main-image-wrapper">
                <img 
                  src={bulkerMain} 
                  alt="Bulker Trailer" 
                  className="main-image"
                />
              </div>

              {/* Thumbnail Strip */}
              <div className="thumbnail-strip">
                <div className="thumbnail-item active">
                  <img src={img1} alt="Side view" />
                </div>
                <div className="thumbnail-item">
                  <img src={img2} alt="Silo view" />
                </div>
                <div className="thumbnail-item">
                  <img src={img3} alt="Team view" />
                </div>
                <div className="thumbnail-item">
                  <img src={img4} alt="Wheel view" />
                </div>
              </div>
            </section>

            {/* Right Column - Details */}
            <section className="details-section">
              
              {/* Header */}
              <div className="product-header">
                <span className="product-badge">Premium Series</span>
                <h1 className="product-title">Bulker Trailer</h1>
                <p className="product-description">
                  Engineered for heavy-duty performance. The Bulker Trailer combines robust construction 
                  with advanced suspension systems, designed for efficient bulk material transportation 
                  in demanding industrial environments.
                </p>
              </div>

              {/* Specifications */}
              <div className="specs-container">
                <h3 className="specs-heading">Technical Specifications</h3>
                <div className="specs-list">
                  
                  <div className="spec-row">
                    <span className="spec-label">Model</span>
                    <span className="spec-value">Bulker Trailer</span>
                  </div>

                  <div className="spec-row">
                    <span className="spec-label">Chassis</span>
                    <span className="spec-value">Heavy Duty Steel</span>
                  </div>

                  <div className="spec-row">
                    <span className="spec-label">Axle Configuration</span>
                    <span className="spec-value">2 & 3 Axle</span>
                  </div>

                  <div className="spec-row">
                    <span className="spec-label">Brake</span>
                    <span className="spec-value">Pneumatic Brake</span>
                  </div>

                  <div className="spec-row">
                    <span className="spec-label">Suspension</span>
                    <span className="spec-value">Mechanical / Pneumatic</span>
                  </div>

                  <div className="spec-row">
                    <span className="spec-label">Volume</span>
                    <span className="spec-value">40 – 60 CBM</span>
                  </div>

                  <div className="spec-row">
                    <span className="spec-label">Tyre Size</span>
                    <span className="spec-value">10.00 × 20</span>
                  </div>

                  <div className="spec-row">
                    <span className="spec-label">Paint</span>
                    <span className="spec-value">Two coats of zinc rich metal primer and 2 coats of enamel paint.</span>
                  </div>

                </div>
              </div>

              {/* Key Features */}
              <div className="features-container">
                <h3 className="features-heading">Key Features</h3>
                <ul className="features-list">
                  <li className="feature-item">
                    <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                    </svg>
                    <span>High-strength steel chassis for maximum durability</span>
                  </li>
                  <li className="feature-item">
                    <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                    </svg>
                    <span>Advanced pneumatic brake system for safety</span>
                  </li>
                  <li className="feature-item">
                    <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                    </svg>
                    <span>40-60 CBM capacity for efficient bulk transport</span>
                  </li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="action-buttons">
                <button className="btn-primary">
                  Request Quote — Contact Sales
                </button>
                <button className="btn-secondary">
                  Download Specs
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

export default Bulkers;