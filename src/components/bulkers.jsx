import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./bulkers.css";

import bulkerMain from "../assets/images/BUL-T.png";
import img1 from "../assets/images/trailler tank.png";
import img2 from "../assets/images/bul2.png";
import img3 from "../assets/images/side.png";
import img4 from "../assets/images/back.png";

const thumbnails = [
  { src: img1, alt: "Side view" },
  { src: img2, alt: "Silo view" },
  { src: img3, alt: "Team view" },
  { src: img4, alt: "Wheel view" },
];

const Bulkers = () => {
  const navigate = useNavigate();
  const [activeImg, setActiveImg] = useState(bulkerMain);
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <div className="bulkers-page">
      <Navbar />

      {/* ── HERO BANNER ── */}
      <div className="bk-hero">
        <div className="bk-hero-content">
          <span className="bk-hero-eyebrow">Premium Series</span>
          <h1 className="bk-hero-title">Bulker Trailers</h1>
          <p className="bk-hero-sub">"Built tough. Engineered to deliver."</p>
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
                  alt="Bulker Trailer"
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
                <h1 className="product-title">Bulkers</h1>
                <p className="product-description">
                  Engineered for heavy-duty performance. The Bulker Trailer combines robust
                  construction with advanced suspension systems, designed for efficient bulk
                  material transportation in demanding industrial environments.
                </p>
              </div>

              <hr className="bk-divider" />

              {/* Specifications */}
              <div className="specs-container">
                <h3 className="specs-heading">Technical Specifications</h3>
                <div className="specs-list">
                  {/* Range specs use a dedicated range-row layout */}
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
                    <span className="spec-value">2 Axle &nbsp;/&nbsp; 3 Axle</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-label">Brake System</span>
                    <span className="spec-value">Pneumatic Brake</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-label">Suspension</span>
                    <span className="spec-value">Mechanical &nbsp;/&nbsp; Pneumatic</span>
                  </div>

                  {/* Volume range — visual range bar */}
                  <div className="spec-row spec-range-row">
                    <span className="spec-label">Volume Capacity</span>
                    <div className="spec-range">
                      <div className="range-track">
                        <div className="range-fill" />
                        <span className="range-min">36 CBM-</span>
                        <span className="range-max">42 CBM</span>
                      </div>
                      <span className="range-note">Customisable per order</span>
                    </div>
                  </div>

                  <div className="spec-row">
                    <span className="spec-label">Tyre Size</span>
                    <span className="spec-value">10.00 × 20</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-label">Paint Finish</span>
                    <span className="spec-value">Zinc-rich metal primer (×2) + Enamel paint (×2)</span>
                  </div>
                </div>
              </div>

              <hr className="bk-divider" />

              {/* Key Features */}
              <div className="features-container">
                <h3 className="features-heading">Key Features</h3>
                <ul className="features-list">
                  {[
                    "High-strength steel chassis for maximum durability",
                    "Advanced pneumatic brake system for safety",
                    "36–42 CBM capacity for efficient bulk transport",
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