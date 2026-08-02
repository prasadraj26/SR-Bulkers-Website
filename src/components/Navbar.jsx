import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { FaWhatsapp, FaPhone } from "react-icons/fa";
import "./Navbar.css";
import logo from "../assets/images/logo.webp";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  /* =========================
     NAVBAR SCROLL EFFECT
  ========================= */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* =========================
     HOME NAVIGATION (Hero)
  ========================= */
  const goHome = () => {
    if (location.pathname !== "/") {
      navigate("/");

      setTimeout(() => {
        const hero = document.getElementById("home");
        hero?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else {
      const hero = document.getElementById("home");
      hero?.scrollIntoView({ behavior: "smooth" });
    }

    setIsOpen(false);
  };

  /* =========================
     PAGE NAVIGATION
  ========================= */
  const goPage = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsOpen(false);
  };

  /* =========================
     SCROLL TO SECTION
  ========================= */
  const scrollToSection = (id) => {
    if (location.pathname !== "/") {
      navigate("/");

      setTimeout(() => {
        document
          .getElementById(id)
          ?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else {
      document
        .getElementById(id)
        ?.scrollIntoView({ behavior: "smooth" });
    }

    setIsOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-container">

        {/* LOGO */}
        <div className="logo" onClick={goHome}>
          <img src={logo} alt="SR Bulkers" className="logo-image" />
        </div>

        {/* DESKTOP LINKS */}
        <div className="nav-links">
          <span className="nav-link" onClick={goHome}>
            Home
          </span>

          <span className="nav-link" onClick={() => goPage("/about")}>
            About
          </span>

          <span className="nav-link" onClick={() => goPage("/services")}>
            Services
          </span>

          <span
            className="nav-link"
            onClick={() => scrollToSection("products")}
          >
            Products
          </span>

          <span className="nav-link" onClick={() => goPage("/gallery")}>
            Gallery
          </span>

          <span
            className="nav-link"
            onClick={() => scrollToSection("quote")}
          >
            Contact
          </span>
        </div>

        {/* ACTION BUTTONS - UPDATED WITH ATTRACTIVE ICONS */}
        <div className="nav-actions">
          <a
            href="https://wa.me/918098389303"
            target="_blank"
            rel="noreferrer"
            className="icon-btn whatsapp pulse-animation"
            aria-label="WhatsApp"
          >
            <FaWhatsapp />
            <span className="tooltip">Chat on WhatsApp</span>
          </a>

          <a
            href="tel:+919487885503"
            className="icon-btn call pulse-animation"
            aria-label="Call"
          >
            <FaPhone />
            <span className="tooltip">Call Now</span>
          </a>

          <button
            className="menu-toggle"
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
          >
            <FiMenu />
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <>
          <div
            className="overlay"
            onClick={() => setIsOpen(false)}
          />

          <div className="mobile-menu">

            <button
              className="close-menu"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
            >
              <FiX />
            </button>

            <span onClick={goHome}>Home</span>

            <span onClick={() => goPage("/about")}>
              About
            </span>

            <span onClick={() => goPage("/services")}>
              Services
            </span>

            <span
              onClick={() => scrollToSection("products")}
            >
              Products
            </span>

            <span onClick={() => goPage("/gallery")}>
              Gallery
            </span>

            <span
              onClick={() => scrollToSection("quote")}
            >
              Contact
            </span>

            {/* MOBILE ICONS - UPDATED */}
            <div className="mobile-actions">
              <a
                href="https://wa.me/918098389303"
                target="_blank"
                rel="noreferrer"
                className="icon-btn whatsapp mobile-pulse"
              >
                <FaWhatsapp />
                <span className="tooltip">WhatsApp</span>
              </a>

              <a
                href="tel:+919487885503"
                className="icon-btn call mobile-pulse"
              >
                <FaPhone />
                <span className="tooltip">Call</span>
              </a>
            </div>

          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;