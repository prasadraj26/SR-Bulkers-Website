import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

/* ===== LOADERS ===== */
import Loader from "./components/Loader";        // first-visit only
import RouteLoader from "./components/RouteLoader"; // every navigation

/* ===== AI CHATBOT ===== */
import ChatBot from "./ai/ChatBot";

/* ===== PUBLIC PAGES ===== */
import Home from "./pages/Home";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import ProductsPage from "./pages/ProductsPage";
import GalleryPage from "./pages/GalleryPage";

/* ===== SCROLL FIX ===== */
import ScrollToTop from "./components/ScrollToTop";

/* ===== PRODUCT DETAIL PAGE ===== */
import Bulkers from "./components/bulkers";

/* ===== ADMIN ===== */
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import ManageGallery from "./admin/ManageGallery";
import ManageServices from "./admin/ManageServices";
import ManageQuote from "./admin/ManageQuote";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [firstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 800 });

    // ✅ Detect REAL page load (no fake timer)
    const handleLoad = () => setFirstLoad(false);

    if (document.readyState === "complete") {
      setFirstLoad(false);
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  // ✅ Show loader ONLY on first visit
  if (firstLoad) {
    return <Loader />;
  }

  return (
    <Router>

      {/* 🔥 Route-based loader (no double trigger now) */}
      <RouteLoader />

      {/* Scroll-to-top on route change */}
      <ScrollToTop />

      <Routes>

        {/* ===== PUBLIC ===== */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/gallery" element={<GalleryPage />} />

        {/* ===== PRODUCT DETAIL ===== */}
        <Route path="/bulkers" element={<Bulkers />} />

        {/* ===== ADMIN ===== */}
        <Route path="/admin" element={<AdminLogin />} />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/manage-gallery"
          element={
            <ProtectedRoute>
              <ManageGallery />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/manage-services"
          element={
            <ProtectedRoute>
              <ManageServices />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/manage-quotes"
          element={
            <ProtectedRoute>
              <ManageQuote />
            </ProtectedRoute>
          }
        />

      </Routes>

      <ChatBot />

    </Router>
  );
}

export default App;