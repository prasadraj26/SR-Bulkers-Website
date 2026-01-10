import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

/* ===== PUBLIC PAGES ===== */
import Home from './pages/Home'
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import ProductsPage from './pages/ProductsPage'
import GalleryPage from './pages/GalleryPage'

/* ===== ADMIN ===== */
import AdminLogin from './admin/AdminLogin'
import AdminDashboard from './admin/AdminDashboard'
import ManageGallery from './admin/ManageGallery'
import ManageServices from './admin/ManageServices'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  useEffect(() => {
    AOS.init({ duration: 800 })
  }, [])

  return (
    <Router>
      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/gallery" element={<GalleryPage />} />

        {/* ADMIN */}
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
      </Routes>
    </Router>
  )
}

export default App
